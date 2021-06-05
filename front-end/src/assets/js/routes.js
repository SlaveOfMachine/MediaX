import Pages from '../../render/Pages';
import {
    PublicRoute,
    PrivateRoute,
    VerificationRoute
} from '../../helpers/middleware';


const routes = [
    {
        component: Pages.Login,
        path: '/',
        type: PublicRoute,
    },
    {
        component: Pages.Register,
        path: '/register',
        type: PublicRoute,
    },
    {
        component: Pages.Dashboard,
        path: '/dashboard',
        type: PrivateRoute,
    },
    {
        component: Pages.Collections,
        path: '/collections',
        type: PrivateRoute,
    },
    {
        component: Pages.Collections,
        path: '/collections',
        type: PrivateRoute,
    },
    {
        component: Pages.Settings,
        path: '/collections',
        type: PrivateRoute,
    },
    {
        component: Pages.VerificationProcess,
        path: '/collections',
        type: VerificationRoute,
    },
]

export default routes;