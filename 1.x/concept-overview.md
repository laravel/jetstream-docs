# Concept Overview

[[toc]]

## Introduction

Laravel Jetstream's architecture is a little different than other Laravel application starter kits such as [Laravel Breeze](https://laravel.com/docs/starter-kits). In this documentation, we'll cover some of the high-level concepts that will help you understand how Laravel Jetstream is constructed.

## Actions

In contrast to Laravel Breeze, Laravel Jetstream does not publish controllers or routes to your application. Instead, Jetstream's functionality is customized via "Action" classes. During the Jetstream installation process, Actions are published to your application's `app/Actions` directory.

Action classes typically perform a single action and correspond to a single Jetstream or Fortify feature, such as creating a team or deleting a user. You are free to customize these classes if you would like to tweak the backend behavior of Jetstream. Each of the relevant Actions published by Jetstream will be discussed within the feature's corresponding documentation.

## Views / Pages

During installation, Jetstream will publish a variety of views and classes to your application. When using Livewire, views will be published to your application's `resources/views` directory. When using Inertia, "Pages" will be published to your `resources/js/Pages` directory.

The views / pages published by Jetstream contain every feature supported by Jetstream and you are free to customize them as needed. Think of Jetstream as a starting point for your application. Once you have installed Jetstream, you are free to customize anything you like.

### Dashboard

The "main" view of your application is published at `resources/views/dashboard.blade.php` when using Livewire and `resources/js/Pages/Dashboard.vue` when using Inertia. You are free to use this as a starting point for building the primary "dashboard" of your application.

### Livewire Components

When using the Livewire stack, Jetstream utilizes a variety of generic Blade components such as buttons and modals. If you are using the Livewire stack and you would like to publish these components after installing Jetstream, you may use the `vendor:publish` Artisan command:

```bash
php artisan vendor:publish --tag=jetstream-views
```

Once these components have been published, you are free to modify them as necessary to adjust the look and feel of your application.

## Tailwind

During installation, Jetstream will scaffold your application's integration with the Tailwind CSS framework. Specifically, a `webpack.mix.js` file and `tailwind.config.js` file will be created. These two files are used to build your application's compiled CSS output. You are free to modify these files as needed for your application.

In addition, your `tailwind.config.js` file has been pre-configured to support PurgeCSS with the relevant directories properly specified depending on your chosen Jetstream stack.

Your application's `package.json` file is already scaffolded with NPM commands that you may use to compile your assets. For more information on compiling your application's assets, consult the [Laravel Mix documentation](https://laravel.com/docs/mix):

```bash
# Compile your CSS / JavaScript for development...
npm run dev

# Compile your CSS / JavaScript for production...
npm run prod

# Compile your CSS / JavaScript for development and recompile on change...
npm run watch
```

