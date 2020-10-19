import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/context';

const PrivateRoute = ({ component: Component, ...props }) => {
  const authState = useContext(authContext);
  const { authenticated, loading, userAuthorizationFn } = authState;

  useEffect(() => {
    userAuthorizationFn();
  }, []);

  return (
    <Route {...props}>
      { !authenticated && !loading
        ? <Redirect to="/" />
        : <Component {...props} />}
    </Route>

  );
};

export default PrivateRoute;
