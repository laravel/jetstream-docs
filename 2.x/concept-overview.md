# Concept Overview

[[toc]]

## Introduction

Laravel Jetstream's architecture is a little different from other Laravel application starter kits such as [Laravel Breeze](https://laravel.com/docs/starter-kits). In this documentation, we'll cover some of the high-level concepts that will help you understand how Laravel Jetstream is constructed.

## Laravel Fortify

Under the hood, the authentication portions of Jetstream are powered by [Laravel Fortify](https://github.com/laravel/fortify), which is a front-end agnostic, "headless" authentication backend for Laravel.

Fortify registers the routes and controllers needed to implement all of Laravel's authentication features, including login, registration, password reset, email verification, and more. After installing Fortify, you may run the `route:list` Artisan command to see the routes that Fortify has registered.

Since Fortify does not provide its own user interface, it is meant to be paired with your own user interface which makes requests to the routes it registers. Laravel Jetstream is our first-party implementation of a user interface built on top of the Fortify authentication backend.

#### Fortify Configuration

When Jetstream is installed, a `config/fortify.php` configuration file is installed into your application. Within this configuration file, you can customize various aspects of Fortify's behavior, such as the authentication guard that should be used, where users should be redirected after authentication, and more.

Within the `fortify` configuration file, you can also disable entire features of Fortify, such as the ability to update profile information or passwords.

## Actions

In contrast to [Laravel Breeze](https://laravel.com/docs/starter-kits), Laravel Jetstream does not publish controllers or routes to your application. Instead, Jetstream's functionality is customized via "Action" classes. During the Jetstream installation process, actions are published to your application's `app/Actions` directory.

Action classes typically perform a single action and correspond to a single Jetstream or Fortify feature, such as creating a team or deleting a user. You are free to customize these classes if you would like to tweak the backend behavior of Jetstream. Each of the relevant actions published by Jetstream will be discussed within the feature's corresponding documentation.

## Views / Pages

During installation, Jetstream will publish a variety of views and classes to your application. When using Livewire, views will be published to your application's `resources/views` directory. When using Inertia, "Pages" will be published to your `resources/js/Pages` directory.

The views / pages published by Jetstream contain every feature supported by Jetstream and you are free to customize them as needed. Think of Jetstream as a starting point for your application. Once you have installed Jetstream, you are free to customize anything you like.

### Layouts

#### The Application Layout

After installation, your Jetstream application will contain two "layouts". First, Jetstream creates an application layout that is used to define the layout of your application's pages that require authentication, such as your application's dashboard. When using the Livewire stack, this layout is defined at `resources/views/layouts/app.blade.php` and rendered by the `App\View\Components\AppLayout` class. When using the Inertia stack, this layout is defined at `resources/js/Layouts/AppLayout.vue`.

#### The Livewire Guest / Authentication Layout

In addition to the application layout, Jetstream creates a "guest" layout that is used to define the layout for Jetstream's authentication-related pages, such as your application's login, registration, and password reset pages. When using the Livewire stack, this layout is defined at `resources/views/layouts/guest.blade.php` and rendered by the `App\View\Components\GuestLayout` class.

### Dashboard

The "main" view of your application is published at `resources/views/dashboard.blade.php` when using Livewire and `resources/js/Pages/Dashboard.vue` when using Inertia. You are free to use this as a starting point for building the primary "dashboard" of your application.

### Livewire Components

When using the Livewire stack, Jetstream utilizes a variety of generic Blade components such as buttons and modals. If you are using the Livewire stack and you would like to publish these components after installing Jetstream, you may use the `vendor:publish` Artisan command:

```bash
php artisan vendor:publish --tag=jetstream-views
```

Once these components have been published, you are free to modify them as necessary to adjust the look and feel of your application.

## Tailwind

During installation, Jetstream will scaffold your application's integration with the Tailwind CSS framework. Specifically, a `postcss.config.js` file and `tailwind.config.js` file will be created. These two files are used to build your application's compiled CSS output. You are free to modify these files as needed for your application.

In addition, your `tailwind.config.js` file has been pre-configured to support PurgeCSS with the relevant directories properly specified depending on your chosen Jetstream stack.

Your application's `package.json` file is already scaffolded with NPM commands that you may use to compile your assets. For more information on compiling your application's assets, consult the [Vite documentation](https://laravel.com/docs/vite):

```bash
# Compile your CSS / JavaScript for development and recompile on change...
npm run dev

# Compile your CSS / JavaScript for production...
npm run build
```

