import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { Navbar } from '../components/common/BaseLayoutFeatures';
import Routes from '../assets/js/routes';
import { connect } from 'react-redux';

function PagesRenderer({isAuthorised, user}) {

    return (
        <div className='page-view'>
            <BrowserRouter>
                <AuthNavbar isAuthorised={isAuthorised} user={user} />
                <Switch>
                    <ViewsRender routes={Routes} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

function AuthNavbar(props) {
    return props.isAuthorised && props.user ?
        <Navbar verifiedUser={props.user.emailVerified}/> : '';
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

const mapStateToProps = (state) => ({
    isAuthorised: state.isAuthorised,
    user: state.user,
})


export default connect(mapStateToProps)(PagesRenderer);