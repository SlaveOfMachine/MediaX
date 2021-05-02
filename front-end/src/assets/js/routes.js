export default {
    login: { path: '/', auth: false },
    register: { path: '/register', auth: false },
    dashboard: { path: '/dashboard', auth: true },
    test: { path: 'test/:id', auth: true },
}