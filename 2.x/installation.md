# Installation

[[toc]]

## Installing Jetstream

You may use Composer to install Jetstream into your new Laravel project:

```bash
composer require laravel/jetstream
```

After installing the Jetstream package, you may execute the `jetstream:install` Artisan command. This command accepts the name of the stack you prefer (`livewire` or `inertia`). In addition, you may use the `--teams` switch to enable team support. The `jetstream:install` command will also install a suite of "feature" tests that provide test coverage for the features provided by Jetstream. 

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

### Installing Jetstream with the Laravel Installer

If you use to create your Laravel projects with the [Laravel Installer](https://laravel.com/docs/#the-laravel-installer), you can install Laravel Jetstream right away when creating the project.

```bash
laravel new [project-name] --jet
```
With this command the installer it's going to create your new project and ask you to choose the desired stack: Livewire or Inertia. You can skip this step by adding the desired stack like a flag:

#### Installing Jetstream with the Laravel Installer - Livewire Stack
```bash
laravel new [project-name] --jet --stack=livewire
```

#### Installing Jetstream with the Laravel Installer - Inertia Stack
```bash
laravel new [project-name] --jet --stack=inertia
```

### Finalizing The Installation

After installing Jetstream, you should install and build your NPM dependencies and migrate your database:

```bash
npm install
npm run dev
php artisan migrate
```

## Application Logo

After installing Jetstream, you may have noticed that the Jetstream logo is utilized on Jetstream's authentication pages as well as your application's top navigation bar. You may easily customize the logo by modifying two Jetstream components.

### Livewire

If you are using the Livewire stack, you should first publish the Livewire stack's Blade components:

```bash
php artisan vendor:publish --tag=jetstream-views
```

Next, you should customize the SVGs located in the `resources/views/vendor/jetstream/components/application-logo.blade.php`, `resources/views/vendor/jetstream/components/authentication-card-logo.blade.php`, and `resources/views/vendor/jetstream/components/application-mark.blade.php` components.

### Inertia

If you are using the Inertia stack, you should customize the SVGs located in `resources/js/Jetstream/AuthenticationCardLogo.vue`, `resources/js/Jetstream/ApplicationLogo.vue`, and `resources/js/Jetstream/ApplicationMark.vue`.

After customizing these components, you should rebuild your assets:

```bash
npm run dev
```
