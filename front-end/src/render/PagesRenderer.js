import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { Navbar } from '../components/common/BaseLayoutFeatures';
import Routes from '../assets/js/routes';
import { connect } from 'react-redux';
import { logout } from '../store';

function PagesRenderer(props) {
    const LogoutUser = () => {
        props.logout();
    }
    return (
        <div className='page-view'>
            <BrowserRouter>
                <AuthNavbar logout={LogoutUser} isAuthorised={props.isAuthorised} user={props.user} />
                <Switch>
                    <ViewsRender routes={Routes} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

function AuthNavbar(props) {
    return props.isAuthorised && props.user ?
        <Navbar logout={props.logout} verifiedUser={props.user.emailVerified}/> : '';
}

function ViewsRender(props) {
    const routes = props.routes || [];
    return routes.map((route, index) => {
        return <route.type
            path={route.path}
            component={route.component}
            key={index}
            exact
        />
    })
}

const mapStateToProps = state => ({
    isAuthorised: state.auth.isAuthorised,
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PagesRenderer);