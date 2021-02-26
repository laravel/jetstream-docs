# Teams

[[toc]]

## Introduction

If you installed Jetstream using the `--teams` option, your application will be scaffolded to support team creation and management.

Jetstream's team features allow each registered user to create and belong to multiple teams. By default, every registered user will belong to a "Personal" team. For example, if a user named "Sally Jones" creates a new account, they will be assigned to a team named "Sally's Team". After registration, the user may rename this team or create additional teams.

![Screenshot of Laravel Teams](./../../assets/img/teams.png)

:::warning Jetstream Teams

Jetstream's team scaffolding and opinions may not work for every application. If it doesn't work for your use case, feel free to create a non-team based Jetstream application and manually add team functionality to your application based on your own needs.
:::

## Team Creation

The team creation view is accessed via the top-right user navigation dropdown menu.

### Actions

Like many other Jetstream features, team creation and deletion logic may be customized by modifying the relevant action classes within your `app/Actions/Jetstream` directory. These actions include `CreateTeam`, `UpdateTeamName`, and `DeleteTeam`. Each of these actions is invoked when their corresponding task is performed by the user in the application's UI. You are free to modify these actions as required based on your application's needs.

### Views / Pages

When using the Livewire stack, the team creation view is displayed using the `resources/views/teams/create-team-form.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Teams/CreateTeamForm.vue` template. Additional input fields that are specified on the team creation forms will be provided to the `App\Actions\Jetstream\CreateTeam` action class when the user creates a team.

## Inspecting User Teams

Information about a user's teams may be accessed via the methods provided by the `Laravel\Jetstream\HasTeams` trait. This trait is automatically applied to your application's `App\Models\User` model during Jetstream's installation. This trait provides a variety of helpful methods that allow you to inspect a user's teams:

```php
// Access a user's currently selected team...
$user->currentTeam : Laravel\Jetstream\Team

// Access all of the team's (including owned teams) that a user belongs to...
$user->allTeams() : Illuminate\Support\Collection

// Access all of a user's owned teams...
$user->ownedTeams : Illuminate\Database\Eloquent\Collection

// Access all of the teams that a user belongs to but does not own...
$user->teams : Illuminate\Database\Eloquent\Collection

// Access a user's "personal" team...
$user->personalTeam() : Laravel\Jetstream\Team

// Determine if a user owns a given team...
$user->ownsTeam($team) : bool

// Determine if a user belongs to a given team...
$user->belongsToTeam($team) : bool

// Get the role that the user is assigned on the team...
$user->teamRole($team) : \Laravel\Jetstream\Role

// Determine if the user has the given role on the given team...
$user->hasTeamRole($team, 'admin') : bool

// Access an array of all permissions a user has for a given team...
$user->teamPermissions($team) : array

// Determine if a user has a given team permission...
$user->hasTeamPermission($team, 'server:create') : bool
```

### The Current Team

Every user within a Jetstream application has a "current team". This is the team that the user is actively viewing resources for. For example, if you are building a calendar application, your application would display the upcoming calendar events for the user's current team.

You may access the user's current team using the `$user->currentTeam` Eloquent relationship. This relationship may be used to scope your other Eloquent queries by the user's current team:

```php
use App\Models\Calendar;

return Calendar::where(
    'team_id', $request->user()->currentTeam->id
)->get();
```

:::tip Switching Teams

A user may switch their current team via the "team switcher" menu available within the Jetstream navigation bar.
:::

### The Team Object

The team object that is accessed via `$user->currentTeam` or Jetstream's other team-related Eloquent queries provides a variety of useful methods for inspecting the team's attributes and relationships:

```php
// Access the team's owner...
$team->owner : App\Models\User

// Get all of the team's users, including the owner...
$team->allUsers() : Illuminate\Database\Eloquent\Collection

// Get all of the team's users, excluding the owner...
$team->users : Illuminate\Database\Eloquent\Collection

// Determine if the given user is a team member...
$team->hasUser($user) : bool

// Determine if the team has a member with the given email address...
$team->hasUserWithEmail($emailAddress) : bool

// Determine if the given user is a team member with the given permission...
$team->userHasPermission($user, $permission) : bool
```

## Member Management

Team members may be added and removed from a team via Jetstream's "Team Settings" view. By default, only team owners can manage team membership. This restriction is defined in the `App\Policies\TeamPolicy` class. Naturally, you are free to modify this policy as you see fit.

### Member Management Actions

Like the customization process for other Jetstream features, team member addition logic may be customized by modifying the `App\Actions\Jetstream\AddTeamMember` action class. The class' `add` method is invoked with the currently authenticated user, the `Laravel\Jetstream\Team` instance, the email address of the user being added to the team, and the role (if applicable) of the user being added to the team.

This action is responsible for validating that the user can actually be added to the team and then adding the user to the team. You are free to customize this action based on the needs of your particular application.

Team member removal may be customized by modifying the `App\Actions\Jetstream\RemoveTeamMember` action class.

### Member Management Views / Pages

When using the Livewire stack, the team member manager view is displayed using the `resources/views/teams/team-member-manager.blade.php` Blade template. When using the Inertia stack, this view is displayed using the `resources/js/Pages/Teams/TeamMemberManager.vue` template. Generally, these templates should not require customization.

### Invitations

By default, Jetstream will simply add any existing application user that you specify to your team. However, many applications choose to send invitation emails to users that are invited to teams. If the user does not have an account, the invitation email can instruct them to create an account and accept the invitation. Or, if the user already has an account, they can accept or ignore the invitation.

Thankfully, Jetstream allows you to enable team member invitations for your application with just a few lines of code. To get started, pass the `invitations` option when enabling the "teams" feature for your application. This may be done by modifying the `features` array of your application's `config/jetstream.php` configuration file:

```php
use Laravel\Jetstream\Features;

'features' => [
    Features::termsAndPrivacyPolicy(),
    Features::profilePhotos(),
    Features::api(),
    Features::teams(['invitations' => true]),
    Features::accountDeletion(),
],
```

Once you have enabled Jetstream's invitations feature, users that are invited to teams will receive an invitation email with a link to accept the team invitation. Users will not be full members of the team until the invitation is accepted.

#### Invitation Actions

When a user is invited to the team, your application's `App\Actions\Jetstream\InviteTeamMember` action will be invoked with the currently authenticated user, the team that the new user is invited to, the email address of the invited user, and, optionally, the role that should be assigned to the user once they join the team. You are free to review this action or modify it based on the needs of your own application.

:::tip Laravel Mail

Before using the team invitation feature, you should ensure that your Laravel application is configured to [send emails](https://laravel.com/docs/mail). Otherwise, Laravel will be unable to send team invitation emails to your application's users.
:::

## Roles / Permissions

Each team member added to a team may be assigned a given role, and each role is assigned a set of permissions. Role permissions are defined in your application's `App\Providers\JetstreamServiceProvider` class using the `Jetstream::role` method. This method accepts a "slug" for the role, a user-friendly role name, the role permissions, and a description of the role. This information will be used to display the role within the team member management view.

For example, imagine we are building a server management application such as [Laravel Forge](https://forge.laravel.com). We might define our application's team roles like so:

```php
Jetstream::defaultApiTokenPermissions(['read']);

Jetstream::role('admin', 'Administrator', [
    'server:create',
    'server:read',
    'server:update',
    'server:delete',
])->description('Administrator users can perform any action.');

Jetstream::role('support', 'Support Specialist', [
    'server:read',
])->description('Support specialists can read server information.');
```

:::tip Team API Support

When Jetstream is installed with team support, available API permissions are automatically derived by combining all unique permissions available to roles. Therefore, a separate call to the `Jetstream::permissions` method is unnecessary.
:::

### Authorization

Of course, you will need a way to authorize that incoming requests initiated by a team member may actually be performed by that user. A user's team permissions may be inspected using the `hasTeamPermission` method available via the `Laravel\Jetstream\HasTeams` trait.

**There is typically not a need to inspect a user's role. You only need to inspect that the user has a given granular permission.** Roles are simply a presentational concept used to group granular permissions. Typically, you will execute calls to this method within your application's [authorization policies](https://laravel.com/docs/authorization):

```php
return $user->hasTeamPermission($server->team, 'server:update');
```

### Combining Team Permissions With API Permissions

When building a Jetstream application that provides both API support and team support, you should verify an incoming request's team permissions **and** API token permissions within your application's authorization policies. This is important because an API token may have the theoretical ability to perform an action while a user does not actually have that action granted to them via their team permissions:

```php
/**
 * Determine whether the user can update a flight.
 *
 * @param  \App\Models\User  $user
 * @param  \App\Models\Flight  $flight
 * @return bool
 */
public function view(User $user, Flight $flight)
{
    return $user->belongsToTeam($flight->team) &&
           $user->hasTeamPermission($flight->team, 'flight:view') &&
           $user->tokenCan('flight:view');
}
```
