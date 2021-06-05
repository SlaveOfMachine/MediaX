import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { PageNotFound } from '../components/common/BaseLayoutFeatures';
import { Navbar } from '../components/common/BaseLayoutFeatures';
import Routes from '../assets/js/routes';

class PagesRenderer extends React.Component {
    render() {
        return (
            <div className='page-view'>
                <Router>
                    <AuthNavbar />
                    <Switch>
                        <ViewsRender routes={Routes} />
                        <Route component={PageNotFound}/> 
                    </Switch>
                </Router>
            </div>
        )
    }
}

function AuthNavbar() {
    const token = localStorage.getItem('accessToken');
    const user  = JSON.parse(localStorage.getItem('user'));
    return token && user ? <Navbar verifiedUser={user.emailVerified}/> : '';
}

function ViewsRender(props) {
    const routes = props.routes || [];
    return routes.map(route => {
        return <route.type
            path={route.path}
            component={route.component}
            exact />
    })
}


export default PagesRenderer;