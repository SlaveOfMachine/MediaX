import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const computeRenderProps = props => {
    
    let token = localStorage.getItem('accessToken');
     
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
    let token = localStorage.getItem('accessToken');
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