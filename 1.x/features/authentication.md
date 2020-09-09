# Authentication

[[toc]]

## Introduction

Laravel Jetstream automatically scaffolds the login, two-factor login, registration, password reset, and email verification views for your project. **For simplicity, regardless of the stack you choose, these templates are written in Blade and do not use a JavaScript framework.**

![Screenshot of Authentication](./../../assets/img/authentication.png)

## Views

Regardless of the stack chosen for your application, authentication related views are stored in the `resources/views/auth` directory and are Blade templates. You are free to customize the styling of these templates based on your application's needs.

## Actions

As typical of most Jetstream features, the logic executed to satisfy authentication requests can be found in an action class within your application.


Specifically, the `App\Actions\Fortify\UpdateUserProfileInformation` class will be invoked when the user updates their profile. This action is responsible for validating the input and updating the user's profile information.

Therefore, any customizations you wish to make to this logic should be made in this class. The action receives the currently authenticated `$user` and an array of `$input` that contains all of the input from the incoming request, including the updated profile photo if applicable.

### Password Validation Rules

The `App\Actions\Fortify\CreateNewUser`, `App\Actions\Fortify\ResetUserPassword`, and `App\Actions\Fortify\UpdateUserPassword` actions all utilize the `App\Actions\Fortify\PasswordValidationRules` trait.

As you may have noticed, the `App\Actions\Fortify\PasswordValidationRules` trait utilizes a custom `Laravel\Fortify\Rules\Password` validation rule object. This object allows you to easily customize the password requirements for your application. By default, the rule requires a password that is at least 8 characters in length. However, you may use the following methods to customize the password's requirements:

```php
(new Password)->length(10)

// Require at least one uppercase character...
(new Password)->requireUppercase()

// Require at least one numeric character...
(new Password)->requireNumeric()
```

## Email Verification

Laravel Jetstream includes support for requiring that a newly registered user verify their email address. However, support for this feature is disabled by default. To enable this feature, you should uncomment the relevant entry in the `features` configuration item of the `config/fortify.php` configuration file.

Next, you should ensure that your `App\Models\User` class implements the `MustVerifyEmail` interface. This interface is already imported into this model for you.

Once these two setup steps have been completed, newly registered users will receive an email prompting them to verify their email address ownership.
