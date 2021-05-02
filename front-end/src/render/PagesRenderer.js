import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Pages from './Pages';
import { PublicRoute, PrivateRoute } from '../helpers/middleware';
import { Navbar } from '../components/common/BaseLayoutFeatures';
import Routes from '../assets/js/routes';

class PagesRenderer extends React.Component {

    render() {
        return (
            <div className='page-view'>
                <Router>
                    <AuthNavbar />
                    <Switch>
                        <PublicRoute path={Routes.login.path} exact component={Pages.Login} />
                        <PublicRoute path={Routes.register.path} exact component={Pages.Register} />
                        <PrivateRoute path={Routes.dashboard.path} exact component={Pages.Dashboard} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

function AuthNavbar() {
    const token = localStorage.getItem('accessToken');
    return token ? <Navbar /> : '';
}


export default PagesRenderer;