module.exports = [
    {
        title: "Getting Started",
        collapsable: false,
        children: [
            'introduction',
            'installation',
        ],
    }, {
        title: "Features",
        collapsable: false,
        children: prefix('features', [
            'access',
            'profiles',
            'security',
            'api',
            'teams',
        ]),
    }, {
        title: "Stacks",
        collapsable: false,
        children: prefix('stacks', [
            'livewire',
            'inertia',
        ]),
    }
]

function prefix(prefix, children) {
    return children.map(child => `${prefix}/${child}`)
}
