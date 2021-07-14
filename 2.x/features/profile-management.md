# Profile Management

[[toc]]

## Introduction

Laravel Jetstream's profile management features are accessed by the user using the top-right user profile navigation dropdown menu. Jetstream scaffolds views and actions that allow the user to update their name, email address, and, optionally, their profile photo.

![Screenshot of Profile Management](./../../assets/img/profile-management.png)

## Actions

As typical of most Jetstream features, the logic executed to satisfy profile update requests can be found in an action class within your application. Specifically, the `App\Actions\Fortify\UpdateUserProfileInformation` class will be invoked when the user updates their profile. This action is responsible for validating the input and updating the user's profile information.

Therefore, any customizations you wish to make to your application's management of this information should be made in this class. When invoked, the action receives the currently authenticated `$user` and an array of `$input` that contains all of the input from the incoming request, including the updated profile photo if applicable.

:::tip Managing Additional Information

If you need to manage additional information about the user, you are not restricted to just amending the provided "Profile Information" card. You can add as many additional UI elements and forms as you need within the user's profile dashboard.
:::

## Views / Pages

When using the Livewire stack, the user's profile information form is displayed using the `resources/views/profile/update-profile-information-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/UpdateProfileInformationForm.vue` template.

Each of these templates will receive the entire authenticated user object so that you can add additional fields to these forms as necessary. Any additional inputs added to the forms will be included in the `$input` array that is passed to your `UpdateUserProfileInformation` action.

## Profile Photos

### Enabling Profile Photos

If you wish to allow users to upload custom profile photos, you must enable the feature in your application's `config/jetstream.php` configuration file. To enable the feature, simply uncomment the corresponding feature entry from the `features` configuration item within this file:

```php
use Laravel\Jetstream\Features;

'features' => [
    Features::profilePhotos(),
    Features::api(),
    Features::teams(),
],
```

After enabling the profile photo feature, you should execute the `storage:link` Artisan command. This command will create a symbolic link in your application's `public` directory that will allow your user's images to be served by your application. For information regarding this command, please consult the [Laravel filesystem documentation](https://laravel.com/docs/filesystem#the-public-disk):

```bash
php artisan storage:link
```

### Managing Profile Photos

Jetstream's profile photo functionality is supported by the `Laravel\Jetstream\HasProfilePhoto` trait that is automatically attached to your `App\Models\User` class during Jetstream's installation.

This trait contains methods such as `updateProfilePhoto`, `getProfilePhotoUrlAttribute`, `defaultProfilePhotoUrl`, and `profilePhotoDisk` which may all be overwritten by your own `App\Models\User` class if you need to customize their behavior. You are encouraged to read through the source code of this trait so that you have a full understanding of the features it is providing to your application.

The `updateProfilePhoto` method is the primary method used to store profile photos and is called by your application's `App\Actions\Fortify\UpdateUserProfileInformation` action class.

:::tip Laravel Vapor

By default, the `s3` disk will be used to store profile photos when your Jetstream application is running within [Laravel Vapor](https://vapor.laravel.com).
:::

## Account Deletion

The profile management screen also includes an action panel that allows the user to delete their application account. When the user chooses to delete their account, the `App\Actions\Jetstream\DeleteUser` action class will be invoked. You are free to customize your application's account deletion logic within this class.

The account deletion feature may be disabled by removing the feature from your application's `config/jetstream.php` configuration file:

```php
use Laravel\Jetstream\Features;

'features' => [
    Features::termsAndPrivacyPolicy(),
    Features::profilePhotos(),
    Features::api(),
    Features::teams(),
    // Features::accountDeletion(),
],
```
