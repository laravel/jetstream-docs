# oAuth

[[toc]]

## Introduction

Jetstream includes first-party integration with [Socialite](https://laravel.com/docs/socialite). Laravel Socialite provides a simple way to oAuth with services such as Facebook and Twitter. Laravel Jetstream's oAuth features provides registration / login using 3rd party providers and an interface for connecting and disconnecting oAuth accounts.

![Screenshot of Laravel Jetstream oAuth Login](./../../assets/img/oauth-login.png)

![Screenshot of Laravel Jetstream oAuth Connected Accounts](./../../assets/img/oauth-connected-accounts.png)

## Views / Pages

When using the Livewire stack, the view for login icons is displayed using `resources/views/components/socialite.blade.php` Blade template. For authenticated users, the connected accounts view is displayed using the `resources/views/profile/connected-accounts-form.blade.php` Blade template. 

When using the Inertia stack, the view for login icons is displayed using `resources/js/Jestream/Socialite.vue`. For authenticated users, the connected accounts view is displayed using the `resources/js/Jetstream/ConnectedAccountsForm.vue` template.

## Enabling oAuth Support

If you wish to allow users to login using oAuth, you must first configure your oAuth providers per the [Socialite docs](https://laravel.com/docs/socialite). Secondly, you must enable the feature in your `/config/jetstream.php` configuration file. To enable this feature, simply uncomment the feature entry from the `features` configuration item within this file:

```php
'features' => [
    // Features::socialite(['facebook' => true, 'github' => true]),
],
```
