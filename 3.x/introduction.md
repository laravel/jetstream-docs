# Introduction

[[toc]]

## Laravel Jetstream

Laravel Jetstream is a beautifully designed application starter kit for Laravel and provides the perfect starting point for your next Laravel application. Jetstream provides the implementation for your application's login, registration, email verification, two-factor authentication, session management, API via [Laravel Sanctum](https://github.com/laravel/sanctum), and optional team management features.

Jetstream is designed using [Tailwind CSS](https://tailwindcss.com) and offers your choice of [Livewire](./stacks/livewire.md) or [Inertia](./stacks/inertia.md) scaffolding.

![Screenshot of Laravel Jetstream](./../assets/img/preview-2.png)

## Available Stacks

Laravel Jetstream offers your choice of two frontend stacks: [Livewire](https://laravel-livewire.com) and [Inertia.js](https://inertiajs.com). Each stack provides a productive, powerful starting point for building your application; however, the stack you choose will depend on your preferred templating language.

### Livewire + Blade

[Laravel Livewire](https://laravel-livewire.com) is a library that makes it simple to build modern, reactive, dynamic interfaces using Laravel Blade as your templating language. This is a great stack to choose if you want to build an application that is dynamic and reactive but don't feel comfortable jumping into a full JavaScript framework like Vue.js.

When using Livewire, you may pick and choose which portions of your application will be a Livewire component, while the remainder of your application can be rendered as the traditional Blade templates you are used to.

:::tip Livewire Screencasts

If you're new to Livewire, check out the [screencasts available on the Livewire website](https://laravel-livewire.com/screencasts/installation).
:::

### Inertia + Vue

The [Inertia](https://inertiajs.com) stack provided by Jetstream uses [Vue.js](https://vuejs.org) as its templating language. Building an Inertia application is a lot like building a typical Vue application; however, you will use Laravel's router instead of Vue router. Inertia is a small library that allows you to render single-file Vue components from your Laravel backend by providing the name of the component and the data that should be hydrated into that component's "props".

In other words, this stack gives you the full power of Vue.js without the complexity of client-side routing. You get to use the standard Laravel routing and view data hydration approaches that you are used to.

The Inertia stack is a great choice if you are comfortable with and enjoy using Vue.js as your templating language.

:::tip Inertia Screencasts

If you're new to Inertia, check out the [screencasts available on the Laracasts website](https://laracasts.com/series/build-modern-laravel-apps-using-inertia-js).
:::
