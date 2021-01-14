# Registration

[[toc]]

## Introduction

Of course, before anyone can use your application, they need to create an account. Thankfully, Jetstream provides a registration view and a corresponding action that handles user registrations so that you can focus on building your application.

![Screenshot of Authentication](./../../assets/img/authentication.png)

## Actions

As typical of most Jetstream features, the logic executed to satisfy registration requests can be found in an action class within your application. Remember, actions are granular classes that are responsible for performing a single task related to a Jetstream or Fortify feature.

Specifically, the `App\Actions\Fortify\CreateNewUser` class will be invoked when a user registers with your application. This action is responsible for validating the incoming request input and creating the user. Therefore, any customizations you wish to make to user creation logic should be made in this class. The action receives an array of `$input` that contains all of the input from the incoming request.

### Password Validation Rules

The `App\Actions\Fortify\CreateNewUser`, `App\Actions\Fortify\ResetUserPassword`, and `App\Actions\Fortify\UpdateUserPassword` actions all utilize the `App\Actions\Fortify\PasswordValidationRules` trait.

As you may have noticed, the `App\Actions\Fortify\PasswordValidationRules` trait utilizes a custom `Laravel\Fortify\Rules\Password` validation rule object. This object allows you to easily customize the password requirements for your application. By default, the rule requires a password that is at least eight characters in length. However, you may use the following methods to customize the password's requirements:

```php
use Laravel\Fortify\Rules\Password;

// Require at least 10 characters...
(new Password)->length(10)

// Require at least one uppercase character...
(new Password)->requireUppercase()

// Require at least one numeric character...
(new Password)->requireNumeric()

// Require at least one special character...
(new Password)->requireSpecialCharacter()
```

Of course, these methods may be chained to define the password validation rules for your application:

```php
(new Password)->length(10)->requireSpecialCharacter()
```

## Views / Pages

When using the Livewire stack, the registration view is displayed using the `resources/views/auth/register.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Auth/Register.vue` template. Any additional fields you add to these pages will be available via the `$input` array passed to the `App\Actions\Fortify\CreateNewUser` action.

### Customizing The Registration View

Laravel Jetstream will automatically render the proper views for your application's registration screen. However, sometimes you may wish to customize how the view / page is rendered.

All of Fortify's authentication view rendering logic may be customized using the appropriate methods available via the `Laravel\Fortify\Fortify` class. Typically, you should call this method from the `boot` method of your application's `App\Providers\JetstreamServiceProvider` class:

```php
use Laravel\Fortify\Fortify;

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    Fortify::registerView(function () {
        return view('auth.register');
    });
}
```

#### Customizing Inertia Registration Views

If your application is using the Inertia stack, you may return Inertia pages from your view customization closures:

```php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Fortify;

Fortify::registerView(function () {
    return Inertia::render('Auth/Register');
});
```

## Requiring Terms Of Service / Privacy Policy Approval

Many applications require users to accept their terms of service / privacy policy during registration. Jetstream allows you to easily enable this requirement for your own application, as well as provides a convenient way of writing these documents using Markdown.

To get started, enable this feature in your application's `config/jetstream.php` configuration file:

```php
use Laravel\Fortify\Features;

'features' => [
    Features::termsAndPrivacyPolicy(),
    // Features::profilePhotos(),
    // Features::api(),
    // Features::teams(),
    Features::accountDeletion(),
],
```

Next, you may write your terms of service / privacy policy documents by modifying your application's `resources/markdown/terms.md` and `resources/markdown/policy.md` files.

During registration, Jetstream will automatically ask the user to approve these documents. When the user clicks on the link to view the documents, Jetstream will use [Tailwind's typography plug-in](https://tailwindcss.com/docs/typography-plugin) to render the Markdown into beautifully formatted prose.

## Email Verification

Laravel Jetstream includes support for requiring that a newly registered user verify their email address. However, support for this feature is disabled by default. To enable this feature, you should uncomment the relevant entry in the `features` configuration item of your application's `config/fortify.php` configuration file:

```php
use Laravel\Fortify\Features;

'features' => [
    Features::registration(),
    Features::resetPasswords(),
    Features::emailVerification(),
    Features::updateProfileInformation(),
    Features::updatePasswords(),
    Features::twoFactorAuthentication(),
],
```

Next, you should ensure that your `App\Models\User` class implements the `Illuminate\Contracts\Auth\MustVerifyEmail` interface. This interface is already imported into this model for you.

Once these two setup steps have been completed, newly registered users will receive an email prompting them to verify their email address ownership.

:::tip Laravel Mail

Before using the email verification feature, you should ensure that your Laravel application is configured to [send emails](https://laravel.com/docs/mail). Otherwise, Laravel will not be able to send email verification links to your application's users.
:::
