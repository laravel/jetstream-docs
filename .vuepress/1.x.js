module.exports = [
    {
        title: "Getting Started",
        collapsable: false,
        children: [
            'introduction',
            'installation',
            'concept-overview',
        ],
    }, {
        title: "Features",
        collapsable: false,
        children: prefix('features', [
            'authentication',
            'registration',
            'profile-management',
            'password-update',
            'password-confirmation',
            'two-factor-authentication',
            'browser-sessions',
            'api',
            'teams',
        ]),
    }, {
        title: "Stack Features",
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
