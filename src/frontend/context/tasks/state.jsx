import React, { useReducer } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Context
import taskContext from './context';
import taskReducer from './reducer';
// Types
import {
  GET_PROJECT_TASKS, ADD_TASK, ERROR_TASK, DELETE_TASK, CHANGE_STATUS_TASK,
  SELECTED_TASK, UPDATE_TASK, CHANGE_SELECTED_TASK_VALUE,
} from '../../types';

const TaskState = ({ children }) => {
  const initialState = {
    tasks: [
      {
        id: 1, name: 'Elegir plataforma', state: true, projectId: 1,
      },
      {
        id: 2, name: 'Elegir colores', state: false, projectId: 3,
      },
      {
        id: 3, name: 'Elegir metodos', state: true, projectId: 4,
      },
      {
        id: 4, name: 'Elegir hosting', state: false, projectId: 2,
      },
      {
        id: 5, name: 'Selecionar sistema', state: true, projectId: 1,
      },
      {
        id: 6, name: 'Compartir colores', state: false, projectId: 3,
      },
      {
        id: 7, name: 'Transformar metodos', state: true, projectId: 4,
      },
      {
        id: 8, name: 'Elegir backend', state: false, projectId: 2,
      }, {
        id: 9, name: 'Sacar plataforma', state: true, projectId: 1,
      },
      {
        id: 10, name: 'Elegir produccion', state: false, projectId: 3,
      },
      {
        id: 11, name: 'Elegir solucion', state: true, projectId: 4,
      },
      {
        id: 12, name: 'Elegir salvar desarrollo', state: false, projectId: 2,
      },
    ],
    tasksProject: [],
    error: false,
    selectedTask: {},
  };

  // Dispatch
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Fns CRUD
  const getTasksProjectFn = (projectId) => {
    dispatch({
      type: GET_PROJECT_TASKS,
      payload: projectId,
    });
  };

  const addTaskFn = (task) => {
    dispatch({
      type: ADD_TASK,
      payload: task,
    });
  };

  const showErrorFn = (bool) => {
    dispatch({
      type: ERROR_TASK,
      payload: bool,
    });
  };

  const deleteTaskFn = (taskId) => {
    dispatch({
      type: DELETE_TASK,
      payload: taskId,
    });
  };

  const changeStatusTaskFn = (task) => {
    dispatch({
      type: CHANGE_STATUS_TASK,
      payload: task,
    });
  };

  const selectedTaskFn = (task) => {
    dispatch({
      type: SELECTED_TASK,
      payload: task,
    });
  };

  const updateTaskFn = (task) => {
    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });
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
      changeStatusTaskFn,
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
