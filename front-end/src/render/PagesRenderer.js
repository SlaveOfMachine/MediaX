import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar, PageNotFound } from '../components/common/BaseLayoutFeatures';
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
                    {
                        Routes.map((route, index) => {
                            return <route.type
                                path={route.path}
                                component={route.component}
                                key={index}
                                exact
                            />
                        })
                    }
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

function AuthNavbar(props) {
    return props.isAuthorised && props.user ?
        <Navbar logout={props.logout} verifiedUser={props.user.emailVerified}/> : '';
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