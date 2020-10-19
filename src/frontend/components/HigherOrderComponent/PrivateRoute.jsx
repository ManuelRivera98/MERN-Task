/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react';
// PropTypes
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import authContext from '../../context/auth/context';

const PrivateRoute = ({ component: Component, ...props }) => {
  const authState = useContext(authContext);
  const { authenticated, loading, userAuthorizationFn } = authState;

  useEffect(() => {
    userAuthorizationFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route {...props}>
      { !authenticated && !loading
        ? <Redirect to="/" />
        : <Component {...props} />}
    </Route>

  );
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
};

export default PrivateRoute;
