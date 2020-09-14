# Security

[[toc]]

## Introduction

Laravel Jetstream's security features are accessed by the user using the top-right user profile navigation dropdown menu. Jetstream scaffolds views and actions that allow the user to update their password, enable / disable two-factor authentication, and logout their other browser sessions.

![Screenshot of Security](./../../assets/img/security.png)

### Two-Factor Authentication

Laravel Jetstream automatically scaffolds two factor authentication support for all Jetstream applications. When a user enables two-factor authentication for their account, they should scan the given QR code using a free authenticator application such as Google Authenticator. In addition, they should store the listed recovery codes in a secure password manager such as 1Password.

If the user loses access to their mobile device, the Jetstream login view will allow them to authenticate using one of their recovery codes instead of the temporary token provided by their mobile device's authenticator application.

## Views / Pages

Typically, the views and pages for these features should not require customization, as they are already feature complete. However, their locations are described below.

### Password Update

When using the Livewire stack, the password update view is displayed using the `resources/views/profile/update-password-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/UpdatePasswordForm.vue` template.

### Two-Factor Authentication

When using the Livewire stack, the two-factor authentication management view is displayed using the `resources/views/profile/two-factor-authentication-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/TwoFactorAuthenticationForm.vue` template.

### Browser Sessions

When using the Livewire stack, the browser session management view is displayed using the `resources/views/profile/logout-other-browser-sessions-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/LogoutOtherBrowserSessionsForm.vue` template.

This feature utilizes Laravel's built-in `AuthenticateSession` middleware to safely logout other browser sessions that are authenticated as the current user.

## Actions

As typical of most Jetstream features, the logic executed to satisfy security related requests can be found within action classes within your application. However, only the password update action is customizable. Generally, the two-factor authentication and browser sessions actions should remain encapsulated within Jetstream and should not require customization.

### Password Update

The `App\Actions\Fortify\UpdateUserPassword` class will be invoked when the user updates their password. This action is responsible for validating the input and updating the user's password.

This action utilizes the `App\Actions\Fortify\PasswordValidationRules` trait to determine the validation rules that will be applied to the password. Customizing this trait will uniformly affect the validation rules applied to the password when the user registers, resets their password, or updates their password.

### Password Validation Rules

As you may have noticed, the `App\Actions\Fortify\PasswordValidationRules` trait utilizes a custom `Laravel\Fortify\Rules\Password` validation rule object. This object allows you to easily customize the password requirements for your application. By default, the rule requires a password that is at least 8 characters in length. However, you may use the following methods to customize the password's requirements:

```php
(new Password)->length(10)

// Require at least one uppercase character...
(new Password)->requireUppercase()

// Require at least one numeric character...
(new Password)->requireNumeric()
```

## Password Confirmation

While building your application, you may occasionally have actions that should require the user to confirm their password before the action is performed. Thankfully, Jetstream has built-in functionality to make this a breeze.

### Livewire

If you are using the Livewire stack, your Livewire component that contains the password confirmed action should use the `Laravel\Jetstream\ConfirmsPasswords` trait. Next, you should wrap the action you wish to confirm using the `confirms-password` Blade component. `confirms-password` wrapper should contain `wire:then` directive that specifies which Livewire action should be run once the user's password has been confirmed. Once the user has confirmed their password, they will not be required to re-enter their password for 15 minutes:

```html
<x-jet-confirms-password wire:then="enableAdminMode">
    <x-jet-button type="button" wire:loading.attr="disabled">
        {{ __('Enable') }}
    </x-jet-button>
</x-jet-confirms-password>
```

Next, within your Livewire action that is being confirmed, you should call the `ensurePasswordIsConfirmed` method. This should be done at the very beginning of the relevant action method:

```php
/**
 * Enable administration mode for user.
 *
 * @return void
 */
public function enableAdminMode()
{
    $this->ensurePasswordIsConfirmed();

    // ...
}
```

### Inertia

If you are using the Inertia stack, you should wrap the action you wish to confirm using the `ConfirmsPassword` Vue component provided by Jetstream. This wrapper component should listen for the `@confirmed` event in order to trigger the method that should be called once the user's password is confirmed. Once the user has confirmed their password, they will not be required to re-enter their password for 15 minutes. To get started, import and register the component within your page:

```js
import JetConfirmsPassword from './Jetstream/ConfirmsPassword'

export default {
    components: {
        JetConfirmsPassword,
        // ...
    },
}
```

Next, wrap the component around the element that triggers the action that should be confirmed:

```html
<jet-confirms-password @confirmed="enableAdminMode">
    <jet-button type="button" :class="{ 'opacity-25': enabling }" :disabled="enabling">
        Enable
    </jet-button>
</jet-confirms-password>
```

Finally, you should ensure that the route that performs the confirmed action is assigned the `password.confirm` middleware. This middleware is included with the default installation of Laravel:

```php
Route::post('/admin-mode', function () {
    // ...
})->middleware(['password.confirm']);
```

### Customizing How Passwords Are Confirmed

Sometimes, you may wish to customize how the user's password is validated during confirmation. To do so, you may use the `Fortify::confirmPasswordsUsing` method. This method accepts a Closure which receives the authenticated user instance and the `password` input value of the request. The Closure should return `true` if the password is valid for the given user. Typically, this method should be called from the `boot` method of your `JetstreamServiceProvider`:

```php
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Fortify;

Fortify::confirmPasswordsUsing(function ($user, string $password) {
    return Hash::check($password, $user->password);
});
```
