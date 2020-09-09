# Installation

[[toc]]

## Installing Jetstream

You may use Composer to install Jetstream into your new Laravel project:

```bash
composer require laravel/jetstream
```

After installing Jetstream, you should run the jetstream:install Artisan command. This command accepts the name of the stack you prefer (livewire or inertia). You are highly encouraged to read through the entire documentation of Livewire or Inertia before beginning your Jetstream project. In addition, you may use the teams switch to enable team support:

```bash
php artisan jetstream:install livewire

php artisan jetstream:install inertia --teams
```

After installing your Jetstream stack, you should compile your frontend assets:

```bash
npm install && npm run dev
```

### What Is Installed

During installation, Jetstream will publish a variety of views and classes to your application. When using Livewire, views will be published to your `resources/views` directory. When using Inertia, "Pages" will be published to your `resources/js/Pages` directory. These views / pages contain every feature supported by Jetstream and you are free to customize them as needed. Think of Jetstream as a starting point for your application. Once you have installed Jetstream, you are free to customize anything you like.

In addition, "action" classes are published to your application's `app/Actions` directory. These action classes typically perform a single action and correspond to a single Jetstream feature, such as creating a team or deleting a user. You are free to customize these classes if you would like to tweak the backend behavior of Jetstream.

#### Dashboard

The "main" view of your application is published at `resources/views/dashboard.blade.php` when using Livewire and `resources/js/Pages/Dashboard.vue` when using Inertia. You are free to use this as a starting point for building primary view of your application.

#### Livewire Components

Jetstream uses a variety of Blade components, such as buttons and modals, to power the Livewire stack. If you would like to publish these components, you may use the `vendor:publish` Artisan command:

```bash
php artisan vendor:publish --tag=jetstream-views
```

#### Using The Laravel Installer

If the [Laravel installer](https://github.com/laravel/installer) is installed on your machine, you may use the `jet` switch to create a new Jetstream powered Laravel application:

```bash
laravel new project-name --jet
```

### Tailwind

During installation, Jetstream will scaffold your application's integration with the Tailwind CSS framework. Specifically, a `webpack.mix.js` file and `tailwind.config.js` file will be created. These two files are used to build your compiled application CSS output. You are free to modify these files as needed for your application.

In addition, your `tailwind.config.js` file has been preconfigured to support PurgeCSS with the relevant directories properly specified depending on your chosen Jetstream stack.

## Basic Jetstream Features

Various Jetstream features may be enabled / disabled via the `features` option within your application's `jetstream` configuration file.

### Profile Management

Jetstream includes forms that allow the user to update their name and email address, as well as upload a profile photo. The backend logic for this feature may be customized by modifying the `App\Actions\Fortify\UpdateUserProfileInformation` class installed by Jetstream. The action receives the currently authenticated user as well as an array containing all of the incoming request's input.

#### Profile Photos

Profile photo support for users is made available via the `Laravel\Jetstream\HasProfilePhoto` trait that is added to your application's `User` model during Jetstream's installation. This trait contains methods such as `updateProfilePhoto`, `getProfilePhotoUrlAttribute`, `defaultProfilePhotoUrl`, and `profilePhotoDisk` that may be overwritten by your own model class if you need to customize their behavior.

### Security Features

Jetstream includes forms for the user to update their password, enable two-factor authentication, and logout other authenticated browser sessions for their account. Typically, these features will not need customization. However, password reset / update and password validation logic may be customized by modifying the relevant action classes within your application's `app/Actions/Fortify` directory.

### Email Verification

Jetstream includes support for email verification. After a user registers for your application, they will be redirected to a screen instructing them to click the email verification link that has been sent to their registered email address.

To enable email verification, you should uncomment the `emailVerification` feature in the `features` option of your `fortify` configuration file. In addition, you should ensure your `User` model implements the `MustVerifyEmail` interface.

### Account Deletion

Jetstream includes an action panel that allows the user to completely delete their account. The backend logic for this action may be customized via the `App\Actions\Jetstream\DeleteUser` action class.
