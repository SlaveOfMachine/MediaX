import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Pages from './Pages';
import { PublicRoute, PrivateRoute, VerificationRoute } from '../helpers/middleware';
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
                        <PrivateRoute path={Routes.collections.path} exact component={Pages.Collections} />
                        <PrivateRoute path={Routes.settings.path} exact component={Pages.Settings} />
                        <VerificationRoute path={Routes.emailVerify.path} exact render={props => <Pages.VerificationProcess {...props} />} component={Pages.VerificationProcess} />
                        <Route component={Pages.PageNotFound}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

function AuthNavbar() {
    const token = localStorage.getItem('accessToken');
    const user  = JSON.parse(localStorage.getItem('user'));

    return token ? <Navbar verifiedUser={user.emailVerified}/> : '';
}


export default PagesRenderer;