const routes = {
    login: { path: '/', auth: false },
    register: { path: '/register', auth: false },
    dashboard: { path: '/dashboard', auth: true },
    collections: { path: '/collections', auth: true },
    settings: { path: '/settings', auth: true },
    emailVerify: { path: '/emailVerify/:hash', auth: false }
}

export default routes;