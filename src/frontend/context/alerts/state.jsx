import React, { useReducer } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Reducer
import alertReducer from './reducer';
// Context
import alertContext from './context';
// Types
import { SHOW_ALERT, HIDDEN_ALERT } from '../../types';

const AlertState = ({ children }) => {
  const initialState = {
    alert: null,
  };

  // Dispatch
  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Fns CRUD
  const showAlertFn = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        category,
      },
    });

    // Hidden alert
    setTimeout(() => {
      dispatch({
        type: HIDDEN_ALERT,
        payload: null,
      });
    }, 5000);
  };
  return (
    <alertContext.Provider value={{
      ...state,
      showAlertFn,
    }}
    >
      { children}
    </alertContext.Provider>
  );
};

AlertState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertState;
