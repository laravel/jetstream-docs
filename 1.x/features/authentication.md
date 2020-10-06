# Authentication

[[toc]]

## Introduction

Laravel Jetstream automatically scaffolds the login, two-factor login, registration, password reset, and email verification views for your project. **For simplicity, regardless of the stack you choose, these templates are written in Blade and do not use a JavaScript framework.**

![Screenshot of Authentication](./../../assets/img/authentication.png)

## Laravel Fortify

Under the hood, the authentication portions of Jetstream are powered by [Laravel Fortify](https://github.com/laravel/fortify), which is a front-end agnostic authentication backend for Laravel.

When Jetstream is installed, the `config/fortify.php` configuration file is installed into your application as well. Within this configuration file, you can customize various aspects of Fortify's behavior, such as the authentication guard that should be used, where users should be redirected after authentication, and more.

In addition, you can disable entire features of Fortify, such as the ability to update profile information or passwords.

## Views

Regardless of the stack chosen for your application, authentication related views are stored in the `resources/views/auth` directory and are Blade templates. You are free to customize the styling of these templates based on your application's needs.

### Customizing View Rendering

Sometimes you may wish to customize how a particular authentication view is rendered. All of the authentication view's rendering logic may be customized using the appropriate methods available via the `Laravel\Fortify\Fortify` class. Typically, you should call this method from the `boot` method of your `JetstreamServiceProvider`:

```php
use Laravel\Fortify\Fortify;

Fortify::loginView(function () {
    return view('auth.login');
});

Fortify::registerView(function () {
    return view('auth.register');
});
```

## Actions

As typical of most Jetstream features, the logic executed to satisfy registration / authentication requests can be found in an action class within your application.

Specifically, the `App\Actions\Fortify\CreateNewUser` class will be invoked when a user updates registers with your application. This action is responsible for validating the input and creating the user.

Therefore, any customizations you wish to make to user creation logic should be made in this class. The action receives an array of `$input` that contains all of the input from the incoming request.

### Password Validation Rules

The `App\Actions\Fortify\CreateNewUser`, `App\Actions\Fortify\ResetUserPassword`, and `App\Actions\Fortify\UpdateUserPassword` actions all utilize the `App\Actions\Fortify\PasswordValidationRules` trait.

As you may have noticed, the `App\Actions\Fortify\PasswordValidationRules` trait utilizes a custom `Laravel\Fortify\Rules\Password` validation rule object. This object allows you to easily customize the password requirements for your application. By default, the rule requires a password that is at least 8 characters in length. However, you may use the following methods to customize the password's requirements:

```php
(new Password)->length(10)

// Require at least one uppercase character...
(new Password)->requireUppercase()

// Require at least one numeric character...
(new Password)->requireNumeric()

// Require at least one special character...
(new Password)->requireSpecialCharacter()
```

## Customizing The Authentication Process

### Customizing User Authentication

Sometimes, you may wish to have full customization over how login credentials are authenticated and users are retrieved. Thankfully, Jetstream allows you to easily accomplish this using the `Fortify::authenticateUsing` method.

This method accepts a Closure that receives the incoming HTTP request. The Closure is responsible for validating the login credentials attached to the request and returning the associated user instance. If the credentials are invalid or no user can be found, `null` or `false` should be returned by the Closure. Typically, this method should be called from the `boot` method of your `JetstreamServiceProvider`:

```php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Fortify;

Fortify::authenticateUsing(function (Request $request) {
    $user = User::where('email', $request->email)->first();

    if ($user &&
        Hash::check($request->password, $user->password)) {
        return $user;
    }
})
```

### Customizing The Authentication Pipeline

Jetstream (via Fortify) authenticates login requests through a pipeline of invokable classes. If necessary, you may define a custom pipeline of classes that login requests should be piped through. Each class should have an `__invoke` method which receives the incoming `Illuminate\Http\Request` instance and, like middleware, a `$next` variable.

To define your custom pipeline, you may use the `Fortify::authenticateThrough` method. This method accepts a Closure which should return the array of classes to pipe the login request through. Typically, this method should be called from the `boot` method of your `JetstreamServiceProvider`:

```php
use Laravel\Fortify\Actions\AttemptToAuthenticate;
use Laravel\Fortify\Actions\EnsureLoginIsNotThrottled;
use Laravel\Fortify\Actions\PrepareAuthenticatedSession;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use Laravel\Fortify\Fortify;
use Illuminate\Http\Request;

Fortify::authenticateThrough(function (Request $request) {
    return array_filter([
            config('fortify.limiters.login') ? null : EnsureLoginIsNotThrottled::class,
            RedirectIfTwoFactorAuthenticatable::class,
            AttemptToAuthenticate::class,
            PrepareAuthenticatedSession::class,
    ]);
});
```

## Email Verification

Laravel Jetstream includes support for requiring that a newly registered user verify their email address. However, support for this feature is disabled by default. To enable this feature, you should uncomment the relevant entry in the `features` configuration item of the `config/fortify.php` configuration file:

```php
'features' => [
    Features::registration(),
    Features::resetPasswords(),
    Features::emailVerification(),
    Features::updateProfileInformation(),
    Features::updatePasswords(),
    Features::twoFactorAuthentication(),
],
```

Next, you should ensure that your `App\Models\User` class implements the `MustVerifyEmail` interface. This interface is already imported into this model for you.

Once these two setup steps have been completed, newly registered users will receive an email prompting them to verify their email address ownership.
