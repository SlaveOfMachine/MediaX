const routes = {
    login: { path: '/', auth: false },
    register: { path: '/register', auth: false },
    dashboard: { path: '/dashboard', auth: true },
}

export default routes;