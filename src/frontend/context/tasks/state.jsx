import React, { useReducer } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Context
import taskContext from './context';
import taskReducer from './reducer';
// Client axios
import clientAxios from '../../config/axios';
// Types
import {
  GET_PROJECT_TASKS, ADD_TASK, ERROR_TASK, DELETE_TASK,
  SELECTED_TASK, UPDATE_TASK, CHANGE_SELECTED_TASK_VALUE, ERROR_TASK_MESSAGE,
} from '../../types';

const TaskState = ({ children }) => {
  const initialState = {
    tasksProject: [],
    error: false,
    selectedTask: {},
    message: null,
  };

  // Dispatch
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fns CRUD
  const getTasksProjectFn = async (projectId) => {
    try {
      const response = await clientAxios.get(`/api/tasks?_id=${projectId}`);
      const { data } = response.data;
      dispatch({
        type: GET_PROJECT_TASKS,
        payload: data.values,
      });
    } catch (error) {
      const { message } = error.response.data;

      const alert = {
        msg: message,
        category: 'alert-error',
      };

      dispatch({
        type: ERROR_TASK_MESSAGE,
        payload: alert,
      });
    }
  };

  const addTaskFn = async (task) => {
    try {
      const response = await clientAxios.post('/api/tasks', task);
      const { data } = response.data;
      dispatch({
        type: ADD_TASK,
        payload: data,
      });
    } catch (error) {
      const { message } = error.response.data;

      const alert = {
        msg: message,
        category: 'alert-error',
      };

      dispatch({
        type: ERROR_TASK_MESSAGE,
        payload: alert,
      });
    }
  };

  const showErrorFn = (bool) => {
    dispatch({
      type: ERROR_TASK,
      payload: bool,
    });
  };

  const deleteTaskFn = async (taskId, projectId) => {
    try {
      await clientAxios.delete(`/api/tasks/${taskId}?_id=${projectId}`);

      dispatch({
        type: DELETE_TASK,
        payload: taskId,
      });
    } catch (error) {
      const { message } = error.response.data;

      const alert = {
        msg: message,
        category: 'alert-error',
      };

      dispatch({
        type: ERROR_TASK_MESSAGE,
        payload: alert,
      });
    }
  };

  const selectedTaskFn = (task) => {
    dispatch({
      type: SELECTED_TASK,
      payload: task,
    });
  };

  const updateTaskFn = async (task) => {
    try {
      const response = await clientAxios.put(`/api/tasks/${task._id}?_id=${task.project_id._id}`, task);
      const { data } = response.data;

      dispatch({
        type: UPDATE_TASK,
        payload: data,
      });
    } catch (error) {
      const { message } = error.response.data;

      const alert = {
        msg: message,
        category: 'alert-error',
      };

      dispatch({
        type: ERROR_TASK_MESSAGE,
        payload: alert,
      });
    }
  };

  const changeSelectedTaskValueFn = (value) => {
    dispatch({
      type: CHANGE_SELECTED_TASK_VALUE,
      payload: value,
    });
  };

  return (
    <taskContext.Provider value={{
      ...state,
      getTasksProjectFn,
      addTaskFn,
      showErrorFn,
      deleteTaskFn,
      selectedTaskFn,
      updateTaskFn,
      changeSelectedTaskValueFn,
    }}
    >
      {children}
    </taskContext.Provider>
  );
};

TaskState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskState;
