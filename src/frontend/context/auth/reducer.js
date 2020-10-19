// Types
import {
  SUCCESSFULLY_REGISTER, ERROR_REGISTER, SUCCESSFULLY_LOGIN, ERROR_LOGIN, LOGOUT, GET_USER,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SUCCESSFULLY_REGISTER:
      return {
        ...state,
        user: action.payload,
        message: null,
        loading: false,
      };
    case SUCCESSFULLY_LOGIN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.data,
        message: null,
        authenticated: true,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case LOGOUT:
    case ERROR_REGISTER:
    case ERROR_LOGIN:
      localStorage.removeItem('token');
      return {
        ...state,
        user: {},
        message: action.payload,
        authenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
