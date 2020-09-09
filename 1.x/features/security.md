# Security

[[toc]]

## Introduction

Laravel Jetstream's security features are accessed by the user using the top-right user profile navigation dropdown menu. Jetstream scaffolds views and actions that allow the user to update their password, enable / disable two-factor authentication, and logout their other browser sessions.

![Screenshot of Security](./../../assets/img/security.png)

## Two-Factor Authentication

Laravel Jetstream automatically scaffolds two factor authentication support for all Jetstream applications. When a user enables two-factor authentication for their account, they should scan the given QR code using a free authenticator application such as Google Authenticator. In addition, they should store the listed recovery codes in a secure password manager such as 1Password.

If the user loses access to their mobile device, the Jetstream login view will allow them to authenticate using one of their recovery codes instead of the temporary token provided by their mobile device's authenticator application.

## Views / Pages

Typically, the views and pages for these features should not require customization, as they are already feature complete. However, their locations are described below.

### Password Update

When using the Livewire stack, the password update view is displayed using the `resources/views/profile/update-password-form.blade.php` Blade template. when using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/UpdatePasswordForm.vue` template.

### Two-Factor Authentication

When using the Livewire stack, the two-factor authentication management view is displayed using the `resources/views/profile/two-factor-authentication-form.blade.php` Blade template. when using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/TwoFactorAuthenticationForm.vue` template.

### Browser Sessions

When using the Livewire stack, the browser session management view is displayed using the `resources/views/profile/logout-other-browser-sessions-form.blade.php` Blade template. when using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/LogoutOtherBrowserSessionsForm.vue` template.

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
