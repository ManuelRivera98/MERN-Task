// Types
import { SHOW_ALERT, HIDDEN_ALERT } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case HIDDEN_ALERT:
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    default:
      return state;
  }
};
