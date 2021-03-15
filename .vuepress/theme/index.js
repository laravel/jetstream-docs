module.exports = {
    extend: '@vuepress/theme-default',

    plugins: [
        ['@vuepress/search', {
            test: ['/2\.x/'],
        }]
    ],
}
