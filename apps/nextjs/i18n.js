module.exports = {
    locales:        ['en'],
    defaultLocale:  'en',

    pages:          {
        '*':             ['common', 'forms', 'settings', 'toasts'],
        '/':             ['home'],
        '/contact':      ['home'],
        '/admin/lead/*': ['admin-lead'],
        '/admin':        ['admin']
    },
    interpolation:  {
        prefix: '{{',
        suffix: '}}',
    },
    loadLocaleFrom: (lang, ns) => {
        return import(`./locales/${lang}/${ns}.yaml`).then((m) => m.default)
    }
}
