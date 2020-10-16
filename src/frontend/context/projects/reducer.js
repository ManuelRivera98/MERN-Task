// Types
import {
  SHOW_FORM_PROJECT, ADD_PROJECT, ERROR_FORM, SELECTED_PROJECT, DELETE_PROJECT,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SHOW_FORM_PROJECT:
      return {
        ...state,
        showForm: action.payload,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        showForm: false,
        error: false,
      };
    case ERROR_FORM:
      return {
        ...state,
        error: action.payload,
      };
    case SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: state.projects.filter((project) => project.id === action.payload),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.payload),
        selectedProject: {},
      };
    default:
      return state;
  }
};
