module.exports = {
    title: "Laravel Jetstream",
    description: "Beautifully designed application scaffolding for Laravel",
    base: '/',

    head: require('./head'),

    themeConfig: {
        logo: '/assets/img/logo.svg',
        displayAllHeaders: true,
        activeHeaderLinks: false,
        searchPlaceholder: 'Press / to search',
        lastUpdated: false, // string | boolean
        sidebarDepth: 0,

        repo: 'laravel/jetstream',

        docsRepo: 'laravel/jetstream-docs',
        editLinks: true,
        editLinkText: 'Help us improve this page!',

        nav: [
            { text: 'Home', link: '/', target: '_self' },
            { text: 'Upgrade', link: 'https://github.com/laravel/jetstream/blob/3.x/UPGRADE.md', target: '_self' },
        ],

        sidebar: {
            '/2.x/': require('./2.x'),
            '/3.x/': require('./3.x')
        },
    },
}
