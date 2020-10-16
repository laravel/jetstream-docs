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
        ], [
            'link',
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/assets/img/apple-touch-icon.png?v=00aYpBgAp5'
            }
        ], [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/assets/img/favicon-32x32.png?v=00aYpBgAp5'
            }
        ], [
            'link',
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/assets/img/favicon-16x16.png?v=00aYpBgAp5'
            }
        ], [
            'link',
            {
                rel: 'shortcut icon',
                href: '/assets/img/favicon.ico?v=00aYpBgAp5'
            }
        ], [
            'meta',
            {
                name: 'theme-color',
                content: '#ffffff'
            }
        ],
    ],

    themeConfig: {
        logo: '/assets/img/logo.svg',
        displayAllHeaders: true,
        activeHeaderLinks: false,
        searchPlaceholder: 'Press / to search',
        lastUpdated: false, // string | boolean
        sidebarDepth: 1,

        repo: 'laravel/jetstream',

        docsRepo: 'laravel/jetstream-docs',
        editLinks: true,
        editLinkText: 'Help us improve this page!',

        nav: [
            { text: 'Home', link: '/', target: '_self' },
        ],

        sidebar: {
            '/1.x/': require('./1.x')
        },
    },
}
