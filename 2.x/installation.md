# Installation

[[toc]]

## Installing Jetstream

You may use Composer to install Jetstream into your new Laravel project:

```bash
composer require laravel/jetstream
```

After installing the Jetstream package, you may execute the `jetstream:install` Artisan command. 
This command accepts the name of the stack you prefer (`livewire` or `inertia`). In addition, you may use the `--teams` switch to enable team support. 

The `jetstream:install` command will also install a suite of "feature" tests that provide test coverage for the features provided by Jetstream. 
If you would like to use [Pest PHP](https://pestphp.com) for testing, you may use the `--pest` switch to install a Pest test suite instead of the default PHPUnit test suite.

**You are highly encouraged to read through the entire documentation of [Livewire](https://laravel-livewire.com) or [Inertia](https://inertiajs.com) before beginning your Jetstream project.**

:::danger New Applications Only

Jetstream should only be installed into new Laravel applications. Attempting to install Jetstream into an existing Laravel application will result in unexpected behavior and issues.
:::

#### Install Jetstream With Livewire

```bash
php artisan jetstream:install livewire

php artisan jetstream:install livewire --teams
```

#### Or, Install Jetstream With Inertia

```bash
php artisan jetstream:install inertia

php artisan jetstream:install inertia --teams
```

The Inertia stack may also be installed with SSR support:

```bash
php artisan jetstream:install inertia --ssr
```

You can read more about running the SSR server in the [Laravel Vite plugin](https://laravel.com/docs/vite#ssr) and [Inertia](https://inertiajs.com/server-side-rendering) documentation.

### Finalizing The Installation

After installing Jetstream, you should install and build your NPM dependencies and migrate your database:

```bash
npm install
npm run build
php artisan migrate
```

## Application Logo

After installing Jetstream, you may have noticed that the Jetstream logo is utilized on Jetstream's authentication pages as well as your application's top navigation bar. You may easily customize the logo by modifying a few Jetstream components.

### Livewire

If you are using the Livewire stack, you should first publish the Livewire stack's Blade components:

```bash
php artisan vendor:publish --tag=jetstream-views
```

Next, you should customize the SVGs located in the `resources/views/vendor/jetstream/components/application-logo.blade.php`, `resources/views/vendor/jetstream/components/authentication-card-logo.blade.php`, and `resources/views/vendor/jetstream/components/application-mark.blade.php` components.

### Inertia

If you are using the Inertia stack, you should customize the SVGs located in `resources/js/Components/AuthenticationCardLogo.vue`, `resources/js/Components/ApplicationLogo.vue`, and `resources/js/Components/ApplicationMark.vue`.

After customizing these components, you should rebuild your assets:

```bash
npm run build
```
