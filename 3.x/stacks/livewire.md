# Livewire

[[toc]]

## Introduction

Laravel Livewire is a library that makes it simple to build modern, reactive, dynamic interfaces using Laravel Blade as your templating language. This is a great stack to choose if you want to build an application that is dynamic and reactive but don't feel comfortable jumping into a full JavaScript framework like Vue.js.

When using Livewire, your application's routes will respond with typical Blade templates. However, within these templates you may render Livewire components as necessary:

```html
<div class="mt-4">
    @livewire('server-list')
</div>
```

When using the Livewire stack, Jetstream has some unique features that you should be aware of. We will discuss each of these features below.

:::tip Livewire Documentation

Before using the Livewire stack, you are strongly encouraged to review the entire [Livewire documentation](https://laravel-livewire.com)
:::

## Components

When we created the Jetstream Livewire stack, a variety of Blade components (buttons, panels, inputs, modals) were created to assist in creating UI consistency and ease of use. You are free to use or not use these components. All of these components are located within your application's `resources/view/components` directory.

You may gain insight into how to use these components by reviewing their usage within Jetstream's existing views located within your application's `resources/views` directory.

## Modals

Most of the Jetstream Livewire stack's components have no communication with your backend. However, the Livewire modal components included with Jetstream do interact with your Livewire backend to determine their open / closed state.

In addition, Jetstream includes two types of modals: `dialog-modal` and `confirmation-modal`. The `confirmation-modal` may be used when confirming destructive actions such as deletions, while the `dialog-modal` is a more generic modal window that may be used at any time.

To illustrate the use of modals, consider the following modal that confirms a user would like to delete their account:

```html
<x-confirmation-modal wire:model="confirmingUserDeletion">
    <x-slot name="title">
        Delete Account
    </x-slot>

    <x-slot name="content">
        Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted.
    </x-slot>

    <x-slot name="footer">
        <x-secondary-button wire:click="$toggle('confirmingUserDeletion')" wire:loading.attr="disabled">
            Nevermind
        </x-secondary-button>

        <x-danger-button class="ml-2" wire:click="deleteUser" wire:loading.attr="disabled">
            Delete Account
        </x-danger-button>
    </x-slot>
</x-confirmation-modal>
```

As you can see, the modal's open / close state is determined by a `wire:model` property that is declared on the component. The property's name should correspond to a boolean property on your Livewire component's corresponding PHP class. Typically, you will set this property to `true` when the user clicks a UI element in your application that should open the modal. Of course, the property should be set to `false` when you are ready to close the modal.

The modal's contents may be specified by hydrating three Blade component slots: `title`, `content`, and `footer`.
