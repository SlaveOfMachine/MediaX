import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Pages from './Pages';

import { PublicRoute, PrivateRoute } from '../helpers/middleware';

class PagesRenderer extends React.Component {

    state = {
        routes: {
            login: { path: '/', auth: false },
            register: { path: '/register', auth: false },
            dashboard: { path: '/dashboard', auth: true },
            test: { path: 'test/:id', auth: true },
        },
    }

    componentDidMount() {
        console.log(window.location.pathname);
    }

    render() {
        const { routes } = this.state;        

        return (
            <Router>
                <Switch>
                    <PublicRoute path={routes.login.path} exact component={Pages.Login} />
                    <PublicRoute path={routes.register.path} exact component={Pages.Register} />
                    <PrivateRoute path={routes.dashboard.path} exact component={Pages.Dashboard} />
                </Switch>
            </Router>
        )
    }
}


export default PagesRenderer;