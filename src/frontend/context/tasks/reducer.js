// Types
import {
  GET_PROJECT_TASKS, ADD_TASK, ERROR_TASK, DELETE_TASK,
  SELECTED_TASK, UPDATE_TASK, CHANGE_SELECTED_TASK_VALUE, ERROR_TASK_MESSAGE,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECT_TASKS:
      return {
        ...state,
        tasksProject: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasksProject: [action.payload, ...state.tasksProject],
        error: false,
        message: null,
      };
    case ERROR_TASK:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksProject: state.tasksProject.filter((task) => task.id !== action.payload),
        message: null,
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasksProject: state.tasksProject.map((task) => (task._id === action.payload._id
          ? action.payload
          : task)),
        message: null,
      };
    case SELECTED_TASK:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case CHANGE_SELECTED_TASK_VALUE:
      return {
        ...state,
        selectedTask: action.payload,
      };
    case ERROR_TASK_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};
