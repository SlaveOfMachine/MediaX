import React from 'react';
import { Route } from 'react-router-dom';
import { VerificationPending } from '../views/EmailVerification';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const computeRenderProps = props => {
    
    const token = localStorage.getItem('accessToken');
    const user  = JSON.parse(localStorage.getItem('user'));

    if (token && !user.emailVerified) {
      return <VerificationPending />;
    }
    return token ? (
      <Component {...props} />
    ) : (
      props.history.push("/")
    );
  };

  return <Route {...rest} render={computeRenderProps} />;
};

const PublicRoute = ({ props, component: Component, ...rest }) => {
  const computeRenderProps = props => {
    const token = localStorage.getItem('accessToken');
    return token ? (
        props.history.push("/dashboard")
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
    const isVerified = user.emailVerified;
    if (token) {
      return isVerified ? (
        props.history.push("/dashboard")
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