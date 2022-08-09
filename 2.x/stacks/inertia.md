# Inertia

[[toc]]

## Introduction

The Inertia stack provided by Jetstream uses [Vue.js](https://vuejs.org) as its templating language. Building an Inertia application is a lot like building a typical Vue application; however, you will use Laravel's router instead of Vue router. Inertia is a small library that allows you to render single-file Vue components from your Laravel backend by providing the name of the component and the data that should be hydrated into that component's "props".

In other words, this stack gives you the full power of Vue.js without the complexity of client-side routing. The Inertia stack is a great choice if you are comfortable with and enjoy using Vue.js as your templating language. When using Inertia, your application's routes will respond by rendering an Inertia "page". This looks very similar to returning a Laravel Blade view:

```php
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Show the general profile settings screen.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Inertia\Response
 */
public function show(Request $request)
{
    return Inertia::render('Profile/Show', [
        'sessions' => $this->sessions($request)->all(),
    ]);
}
```

When using the Inertia stack, Jetstream has some unique features that you should be aware of. We will discuss each of these features below.

:::tip Inertia Documentation

Before using the Inertia stack, you are strongly encouraged to review the entire [Inertia documentation](https://inertiajs.com)
:::

## Components

When we created the Jetstream Inertia stack, a variety of Vue components (buttons, panels, inputs, modals) were created to assist in creating UI consistency and ease of use. You are free to use or not use these components. All of these components are located within your application's `resources/js/Components` directory.

You may gain insight into how to use these components by reviewing their usage within Jetstream's existing pages located within your application's `resources/js/Pages` directory.

## Customizing Jetstream's Page Rendering

Some of Jetstream's Inertia pages, such as `Teams/Show` and `Profile/Show` are rendered from within Jetstream itself. However, you may need to pass additional data to these pages while building your application. Therefore, Jetstream allows you to customize the data / props passed to these pages using the `Jetstream::inertia()->whenRendering` method.

This method accepts the name of the page you wish to customize and a closure. The closure will receive the incoming HTTP request and an array of the default data that would typically be sent to the page. You are welcome to customize or add new array elements to the data as necessary. Typically, you should call this method from within the `boot` method of your `App\Providers\JetstreamServiceProvider` class:

```php
use Illuminate\Http\Request;
use Laravel\Jetstream\Jetstream;

/**
 * Bootstrap any application services.
 *
 * @return void
 */
public function boot()
{
    // ...

    Jetstream::inertia()->whenRendering(
        'Profile/Show',
        function (Request $request, array $data) {
            return array_merge($data, [
                // Custom data...
            ]);
        }
    );
}
```

:::tip Authentication View Customization

To learn how to customize the Inertia pages rendered by Jetstream's authentication related routes such as login, registration, and password reset, check out the [authentication documentation](./../features/authentication.md#customizing-inertia-authentication-views).
:::

## Modals

Jetstream's Inertia stack also includes two modal components: `DialogModal` and `ConfirmationModal`. The `ConfirmationModal` may be used when confirming destructive actions such as the deletion of resources, while the `DialogModal` is a more generic modal window that may be used at any time.

To illustrate the use of modals, consider the following modal that confirms a user would like to delete their account:

```html
<jet-confirmation-modal :show="confirmingUserDeletion" @close="confirmingUserDeletion = false">
    <template #title>
        Delete Account
    </template>

    <template #content>
        Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted.
    </template>

    <template #footer>
        <jet-secondary-button @click.native="confirmingUserDeletion = false">
            Nevermind
        </jet-secondary-button>

        <jet-danger-button class="ml-2" @click.native="deleteTeam" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
            Delete Account
        </jet-danger-button>
    </template>
</jet-confirmation-modal>
```

As you can see, the modal's open / close state is determined by a `show` property that is declared on the component. The modal's contents may be specified by hydrating three slots: `title`, `content`, and `footer`.

## Routes

Jetstream's Inertia stack includes Tighten's Ziggy library as a JavaScript alternative to the Laravel `route()` helper. You can refer to the [Ziggy usage documentation](https://github.com/tighten/ziggy#usage) for a complete guide on using this library, but some common examples can be found in Jetstream's own Vue files, including `Layouts/AppLayout.vue`:

```html
<jet-nav-link :href="route('dashboard')" :active="route().current('dashboard')">
    Dashboard
</jet-nav-link>
```
