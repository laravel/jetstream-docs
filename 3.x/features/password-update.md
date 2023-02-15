# Password Update

[[toc]]

## Introduction

Laravel Jetstream's security features are accessed by the user using the top-right user profile navigation dropdown menu. Within this dashboard, Jetstream scaffolds views that allow the user to update the password associated with their account.

![Screenshot of Security](./../../assets/img/security.png)

## Actions

Like most of Jetstream's features, the underlying logic used to implement the feature may be customized by modifying a corresponding action class.

The `App\Actions\Fortify\UpdateUserPassword` class will be invoked when the user updates their password. This action is responsible for validating the input and updating the user's password.

This action utilizes the `App\Actions\Fortify\PasswordValidationRules` trait to determine the validation rules that will be applied to the password. Customizing this trait will uniformly affect the validation rules applied to the password when the user registers, resets or updates their password.

### Password Validation Rules

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

Typically, the views and pages for these features should not require customization, as they are already feature-complete. However, their locations are described below in case you need to make small presentation adjustments to these pages.

When using the Livewire stack, the password update view is displayed using the `resources/views/profile/update-password-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/UpdatePasswordForm.vue` template.
