// Types
import {
  GET_PROJECT_TASKS, ADD_TASK, ERROR_TASK, DELETE_TASK, CHANGE_STATUS_TASK,
  SELECTED_TASK, UPDATE_TASK, CHANGE_SELECTED_TASK_VALUE,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECT_TASKS:
      return {
        ...state,
        tasksProject: state.tasks.filter((task) => task.projectId === action.payload),
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        error: false,
      };
    case ERROR_TASK:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case UPDATE_TASK:
    case CHANGE_STATUS_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
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
    default:
      return state;
  }
};
