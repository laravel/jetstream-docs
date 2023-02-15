module.exports = {
    extend: '@vuepress/theme-default',

    plugins: [
        ['@vuepress/search', {
            test: ['/3\.x/'],
        }]
    ],
}
