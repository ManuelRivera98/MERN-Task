import React, { useReducer } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Reducer
import authReducer from './reducer';
// Context
import authContext from './context';
// Types
import {
  SUCCESSFULLY_REGISTER, ERROR_REGISTER, SUCCESSFULLY_LOGIN, ERROR_LOGIN, LOGOUT, GET_USER,
} from '../../types';

// Client axios
import axiosClient from '../../config/axios';
//  authToken
import authToken from '../../config/authToken';

// Config
import config from '../../config';

const AuthContext = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: false,
    user: {},
    message: null,
    loading: true,
  };

  // Dispatch
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fns CRUD
  const registerUserFn = async (data) => {
    try {
      const response = await axiosClient.post('/api/auth/sign-up', data);
      const { data: user } = response.data;

      dispatch({
        type: SUCCESSFULLY_REGISTER,
        payload: user,
      });
    } catch (error) {
      const { email } = error.response.data;

      const alert = {
        msg: email.message,
        category: 'alert-error',
      };

      dispatch({
        type: ERROR_REGISTER,
        payload: alert,
      });
    }
  };

  const loginFn = async (data) => {
    const addApiKeyToken = {
      ...data,
      apiKeyToken: config.apiKeyTokenAdmin,
    };

    console.log(addApiKeyToken);

    try {
      const response = await axiosClient.post('/api/auth/login', addApiKeyToken);

      dispatch({
        type: SUCCESSFULLY_LOGIN,
        payload: response.data,
      });
    } catch (error) {
      const { message } = error.response.data;

      const alert = {
        msg: message,
        category: 'alert-error',
      };

      dispatch({
        type: ERROR_LOGIN,
        payload: alert,
      });
    }
  };

  const userAuthorizationFn = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      authToken(token);
    }

    try {
      const response = await axiosClient.get('/api/users/auth');
      const { data } = response.data;

      dispatch({
        type: GET_USER,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR_LOGIN,
      });
    }
  };

  const logoutFn = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <authContext.Provider value={{
      ...state,
      registerUserFn,
      loginFn,
      userAuthorizationFn,
      logoutFn,
    }}
    >
      { children}
    </authContext.Provider>
  );
};

AuthContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
