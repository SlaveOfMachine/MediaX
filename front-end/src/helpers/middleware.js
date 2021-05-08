import React from 'react';
import { Route } from 'react-router-dom';
import { VerificationPending } from '../views/EmailVerification';

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



export {
    PrivateRoute,
    PublicRoute,
}