import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import VerificationPending from '../views/EmailVerification/VerificationPending';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const computeRenderProps = props => {
    
    const token = localStorage.getItem('accessToken');
    const user  = JSON.parse(localStorage.getItem('user'));

    if (token && user && !user.emailVerified) {
      return <VerificationPending />;
    }
    return token ? (
      <Component {...props} />
    ) : (
      <Redirect to='/' />
    );
  };

  return <Route {...rest} render={computeRenderProps} />;
};

const PublicRoute = ({ props, component: Component, ...rest }) => {
  const computeRenderProps = props => {
    const token = localStorage.getItem('accessToken');
    return token ? (
      <Redirect to='/dashboard' />
    ) : (
      <Component {...props} />  
    );
  };
  return <Route {...rest} render={computeRenderProps} />;
};

const VerificationRoute = ({ props, component: Component, ...rest }) => {
  const computeRenderProps = props => {
    const token = localStorage.getItem('accessToken');
    const tokenObject = token ? jwt_decode(token) : {};
    const user = tokenObject.user || {};
    const isVerified = user && user.emailVerified;
    if (token) {
      return isVerified ? (
        <Redirect to='/dashboard' />
      ) : (
        <Component {...props} />  
      );
    }
    return props.history.push("/");
  };
  return <Route {...rest} render={computeRenderProps} />;
};

export {
  PrivateRoute,
  PublicRoute,
  VerificationRoute,
}