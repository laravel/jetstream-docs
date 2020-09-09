# API

[[toc]]

## API Support

Jetstream includes first-party integration with [Laravel Sanctum](https://laravel.com/docs/sanctum). Laravel Sanctum provides a featherweight authentication system for SPAs (single page applications), mobile applications, and simple, token based APIs. Sanctum allows each user of your application to generate multiple API tokens for their account. These tokens may be granted abilities / permissions which specify which actions the tokens are allowed to perform.

For more information on Sanctum and to learn how to issue requests to a Sanctum authenticated API, please consult the official [Sanctum documentation](https://laravel.com/docs/sanctum).

By default, the API token creation panel may be accessed using the "API" link of the top-right user profile dropdown menu. From this screen, users may create Sanctum API tokens that have various permissions.

### Defining Permissions

The permissions available to API tokens are defined using the `Jetstream::permissions` method within your application's `JetstreamServiceProvider`:

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

### Authorizing Incoming Requests

Every request made to your Jetstream application, even to authenticated routes within your `routes/web.php` file, will be associated with a Sanctum token object. You may determine if the associated token has a given permission using the `tokenCan` method provided by the `Laravel\Jetstream\HasApiTokens` trait. This trait is automatically applied to your application's `User` model:

```php
$request->user()->tokenCan('read');
```

When a user makes a request to a route within your `routes/web.php` file, the request will typically be authenticated by Sanctum through a cookie based `web` guard. Since the user is making a first-party request through the application UI in this case, the `tokenCan` method will always return `true`.
