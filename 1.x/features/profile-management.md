# Profile Management

[[toc]]

## Introduction

Laravel Jetstream's profile management features are accessed by the user using the top-right user profile navigation dropdown menu. Jetstream scaffolds views and actions that allow the user to update their name, email address, and, optionally, their profile photo.

![Screenshot of Profile Management](./../../assets/img/profile-management.png)

## Views / Pages

When using the Livewire stack, this view is displayed using the `resources/views/profile/update-profile-information-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Profile/UpdateProfileInformationForm.vue` template.

Each of these templates will receive the entire authenticated user object so that you can add additional fields to these forms as necessary. Any additional inputs added to the forms will be included in the `$input` array that is passed to your `UpdateUserProfileInformation` action.

## Actions

As typical of most Jetstream features, the logic executed to satisfy profile update requests can be found in an action class within your application. Specifically, the `App\Actions\Fortify\UpdateUserProfileInformation` class will be invoked when the user updates their profile. This action is responsible for validating the input and updating the user's profile information.

Therefore, any customizations you wish to make to this logic should be made in this class. The action receives the currently authenticated `$user` and an array of `$input` that contains all of the input from the incoming request, including the updated profile photo if applicable.

## Profile Photos

By default, Jetstream allows users to upload custom profile photos. This functionality is supported by the `Laravel\Jetstream\HasProfilePhoto` trait that is automatically attached to your `App\Models\User` class during Jetstream's installation.

This trait contains methods such as `updateProfilePhoto`, `getProfilePhotoUrlAttribute`, `defaultProfilePhotoUrl`, and `profilePhotoDisk` which may all be overwritten by your own `App\Models\User` class if you need to customize their behavior. You are encouraged to read through the source code of this trait so that you have a full understanding of the features it is providing to your application.

The `updateProfilePhoto` method is the primary method used to store profile photos and is called by the `UpdateUserProfileInformation` action.

:::tip Laravel Vapor

By default, the `s3` disk will be used automatically when your application is running within [Laravel Vapor](https://vapor.laravel.com).
:::

### Disabling Profile Photos

If you do not wish to allow users to upload custom profile photos, you may disable the feature in your `config/jetstream.php` configuration file. To disable the feature, simply comment out the feature entry from the `features` configuration item within this file:

```php
'features' => [
    // Features::profilePhotos(),
    Features::api(),
    Features::teams(),
],
```

## Account Deletion

The profile management screen also includes an action panel that allows the user to delete their application account. When the user chooses to delete their account, the `App\Actions\Jetstream\DeleteUser` action class will be invoked. You are free to customize your application's account deletion logic within this class.
