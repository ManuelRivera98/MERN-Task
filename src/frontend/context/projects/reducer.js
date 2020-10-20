// Types
import {
  SHOW_FORM_PROJECT, ADD_PROJECT, ERROR_FORM, SELECTED_PROJECT,
  DELETE_PROJECT, GET_PROJECTS, ERROR_PROJECTS,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_PROJECT:
      return {
        ...state,
        showForm: action.payload,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        message: null,
        error: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        showForm: false,
        message: null,
        error: false,
      };
    case ERROR_FORM:
      return {
        ...state,
        error: action.payload,
        message: null,
      };
    case SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: state.projects.filter((project) => project._id === action.payload),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== action.payload),
        selectedProject: {},
        message: null,
      };
    case ERROR_PROJECTS:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
