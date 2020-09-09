# Installation

[[toc]]

## Installing Jetstream

If you have installed the [Laravel Installer](https://laravel.com/docs/installation#installing-laravel), you may use the `--jet` option to create a new Jetstream powered Laravel application:

```bash
laravel new project-name --jet
```

After installing Jetstream via the Laravel Installer, you should migrate your database:

```bash
php artisan migrate
```

### Composer Installation

Alternatively, you may use Composer to install Jetstream into your new Laravel project:

```bash
composer require laravel/jetstream
```

If you choose to install Jetstream through Composer, you should run the `jetstream:install` Artisan command. This command accepts the name of the stack you prefer (livewire or inertia). You are highly encouraged to read through the entire documentation of [Livewire](https://laravel-livewire.com) or [Inertia](https://inertiajs.com) before beginning your Jetstream project. In addition, you may use the `--teams` switch to enable team support:

```bash
php artisan jetstream:install livewire

php artisan jetstream:install inertia --teams

npm install && npm run dev

php artisan migrate
```

## Jetstream Structure

### Views / Pages

During installation, Jetstream will publish a variety of views and classes to your application. When using Livewire, views will be published to your `resources/views` directory. When using Inertia, "Pages" will be published to your `resources/js/Pages` directory. These views / pages contain every feature supported by Jetstream and you are free to customize them as needed. Think of Jetstream as a starting point for your application. Once you have installed Jetstream, you are free to customize anything you like.

#### Dashboard

The "main" view of your application is published at `resources/views/dashboard.blade.php` when using Livewire and `resources/js/Pages/Dashboard.vue` when using Inertia. You are free to use this as a starting point for building the primary view of your application.

### Actions

In addition, "action" classes are published to your application's `app/Actions` directory. These action classes typically perform a single action and correspond to a single Jetstream feature, such as creating a team or deleting a user. You are free to customize these classes if you would like to tweak the backend behavior of Jetstream.

### Tailwind

During installation, Jetstream will scaffold your application's integration with the Tailwind CSS framework. Specifically, a `webpack.mix.js` file and `tailwind.config.js` file will be created. These two files are used to build your compiled application CSS output. You are free to modify these files as needed for your application.

In addition, your `tailwind.config.js` file has been pre-configured to support PurgeCSS with the relevant directories properly specified depending on your chosen Jetstream stack.

Your application's `package.json` file is already scaffolded with NPM commands that you may use to compile your assets:

```bash
npm run dev

npm run prod

npm run watch
```

### Livewire Components

Jetstream uses a variety of Blade components, such as buttons and modals, to power the Livewire stack. If you are using the Livewire stack and you would like to publish these components after installing Jetstream, you may use the `vendor:publish` Artisan command:

```bash
php artisan vendor:publish --tag=jetstream-views
```

## Application Logo

As you may have noticed, the Jetstream logo is utilized on Jetstream's authentication pages as well as the top navigation bar. You may easily customize the logo by modifying two Jetstream components.

### Livewire

If you are using the Livewire stack, you should first publish the Livewire stack's Blade components:

```bash
php artisan vendor:publish --tag=jetstream-views
```

Next, you should customize the SVGs located in the `resources/views/vendor/jetstream/components/application-logo.blade.php` and `resources/views/vendor/jetstream/components/application-mark.blade.php` components.

### Inertia

If you are using the Inertia stack, you should customize the SVGs located in `resources/js/Jetstream/ApplicationLogo.vue` and `resources/js/Jetstream/ApplicationMark.vue`. After customizing these components, you should rebuild your assets:

```bash
npm run dev
```
