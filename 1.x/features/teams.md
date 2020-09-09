# Teams

[[toc]]

## Introduction

If you installed Jetstream using the `teams` option, your application will be scaffolded to support team creation and management. By default, every registered user will belong to a `Personal` team. After registration, the user may rename this team or create additional teams.

Team creation and deletion logic may be customized by modifying the relevant action classes within your `app/Actions/Jetstream` directory. These actions include `CreateTeam`, `UpdateTeamName`, and `DeleteTeam`.

Information about a user's teams may be accessed via the methods provided by the `Laravel\Jetstream\HasTeams` trait. This trait is automatically applied to your application's `User` model:

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

// Access an array of all permissions a user has for a given team...
$user->teamPermissions($team) : array

// Determine if a user has a given team permission...
$user->hasTeamPermission($team, 'server:create') : bool
```

### Current Team

Every user within Jetstream has a "current team". This is the team that the user is actively viewing resources for. For example, if you are building a calendar application, your application would display the upcoming calendar events for the user's current team.

You may access the user's current team using the `$user->currentTeam` Eloquent relationship. This team may be used to scope your other Eloquent queries by the team.

A user may switch their current team via the user profile dropdown menu available within the Jetstream navigation bar.

### Member Management

Team members may be added and removed via Jetstream's "Team Settings" view. The backend logic that manages these actions may be customized by modifying the relevant actions, such as `AddTeamMember`, within the `app/Actions/Jetstream` directory.

### Roles / Permissions

Each team member added to a team is assigned a given role, and each role is assigned a set of permissions. Role permissions are defined in your application's `JetstreamServiceProvider`:

```php
Jetstream::defaultApiTokenPermissions(['read']);

Jetstream::role('admin', 'Administrator', [
    'create',
    'read',
    'update',
    'delete',
])->description('Administrator users can perform any action.');

Jetstream::role('editor', 'Editor', [
    'read',
    'create',
    'update',
])->description('Editor users have the ability to read, create, and update.');
```

:::tip Team API Support
When Jetstream is installed with team support, available API permissions are automatically derived by combining all unique permissions available to roles.
:::

### Authorization

A user's team permissions may be determined using the `hasTeamPermission` method available via the `Laravel\Jetstream\HasTeams` trait:

```php
if ($request->user()->hasTeamPermission($team, 'read')) {
    //
}
```

#### Combining Team Permissions With API Permissions

When building a Jetstream application that utilizes API support and team support, you should verify an incoming request's team permissions and API token permissions within your authorization policies. This important because an API token may have the theoretical ability to perform an action while a user does not actually have that action granted to them via their team permissions:

```php
/**
 * Determine whether the user can view a flight.
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
