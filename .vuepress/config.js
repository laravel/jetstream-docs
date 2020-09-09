module.exports = {
    title: "Laravel Jetstream",
    description: "Beautifully designed application scaffolding for Laravel",
    base: '/',

    head: [
        [
            'link',
            {
                href:
                    'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,800,800i,900,900i',
                rel: 'stylesheet',
                type: 'text/css',
            },
        ],
    ],

    themeConfig: {
        logo: '/assets/img/logo.svg',
        displayAllHeaders: false,
        activeHeaderLinks: false,
        searchPlaceholder: 'Press / to search',
        lastUpdated: 'Last Updated', // string | boolean
        sidebarDepth: 0,

        repo: 'laravel/jetstream',

        docsRepo: 'laravel/jetstream-docs',
        editLinks: true,
        editLinkText: 'Help us improve this page!',

        nav: [
            { text: 'Home', link: 'https://jetstream.laravel.com' },
        ],

        sidebar: {
            '/1.0/': require('./1.0')
        },
    },
}
