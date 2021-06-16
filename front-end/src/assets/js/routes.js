import Pages from '../../render/Pages';
import {
    PublicRoute,
    PrivateRoute,
    VerificationRoute
} from '../../helpers/middleware';
import { Route } from 'react-router';


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
        component: Pages.Settings,
        path: '/settings',
        type: PrivateRoute,
    },
    {
        component: Pages.VerificationProcess,
        path: '/emailVerify/:hash',
        type: VerificationRoute,
    },
    {
        component: Pages.PageNotFound,
        path: '/404',
        type: Route,
    }
]

export default routes;