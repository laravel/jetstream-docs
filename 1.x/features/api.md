# API

[[toc]]

## Introduction

Jetstream includes first-party integration with [Laravel Sanctum](https://laravel.com/docs/sanctum). Laravel Sanctum provides a featherweight authentication system for SPAs (single page applications), mobile applications, and simple, token based APIs. Sanctum allows each user of your application to generate multiple API tokens for their account. These tokens may be granted abilities / permissions which specify which actions the tokens are allowed to perform.

![Screenshot of Laravel Jetstream API](./../../assets/img/api.png)

By default, the API token creation panel may be accessed using the "API" link of the top-right user profile dropdown menu. From this screen, users may create Sanctum API tokens that have various permissions.

:::tip Sanctum Documentation

For more information on Sanctum and to learn how to issue requests to a Sanctum authenticated API, please consult the official [Sanctum documentation](https://laravel.com/docs/sanctum).
:::

## Enabling API Support

If your application will be offering an API to third-parties, you must enable Jetstream's API feature. To do so, you should uncomment the relevant entry in the `features` configuration option of the `config/jetstream.php` configuration file:

```php
'features' => [
    Features::profilePhotos(),
    Features::api(),
    Features::teams(),
],
```

## Defining Permissions

The permissions available to API tokens are defined using the `Jetstream::permissions` method within your application's `JetstreamServiceProvider`. Permissions are just simple strings. Once they have been defined they may be assigned to an API token:

```php
Jetstream::defaultApiTokenPermissions(['read']);

Jetstream::permissions([
    'create',
    'read',
    'update',
    'delete',
]);
```

The `defaultApiTokenPermissions` method may be used to specify which permissions should be selected by default when creating a new API token. Of course, a user may uncheck a default permission before creating the token.

## Authorizing Incoming Requests

Every request made to your Jetstream application, even to authenticated routes within your `routes/web.php` file, will be associated with a Sanctum token object. You may determine if the associated token has a given permission using the `tokenCan` method provided by the `Laravel\Sanctum\HasApiTokens` trait. This trait is automatically applied to your application's `App\Models\User` model during Jetstream's installation:

```php
$request->user()->tokenCan('read');
```

#### First-Party UI Initiated Requests

When a user makes a request to a route within your `routes/web.php` file, the request will typically be authenticated by Sanctum through a cookie based `web` guard. Since the user is making a first-party request through the application UI in this scenario, the `tokenCan` method will always return `true`.

At first, this behavior may seem strange; however, it is convenient to be able to always assume an API token is available and can be inspected via the `tokenCan` method. This means that within your application's authorizations policies you may always call this method without fear that there is no token associated with the request.

Note that the `tokenCan` only deaults to true for first-party API request authenticated using Laravel Sanctum as described in the [Laraven Sanctum docs]https://laravel.com/docs/8.x/sanctum#token-abilities). This method will not default to true for applications using other authentication like [laravel/ui](https://github.com/laravel/ui) which is used by for example [Laravel Nova](https://nova.laravel.com/). In such cases policies using `tokenCan` needs to check manually if the request is comming from a first-party UI not authenticated by Sanctum:

```php
request()->is('nova-api/*') || $request->user()->tokenCan('read'); // Check if an API request from Laravel Nova
```
