import React, { useReducer } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Context
import projectContext from './context';
// Reducer
import projectReducer from './reducer';
// Client axios
import clientAxios from '../../config/axios';
// Types
import {
  SHOW_FORM_PROJECT, ADD_PROJECT, ERROR_FORM, SELECTED_PROJECT,
  DELETE_PROJECT, GET_PROJECTS, ERROR_PROJECTS,
} from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = ({ children }) => {
  const initialState = {
    projects: [],
    showForm: false,
    selectedProject: {},
    message: null,
    error: false,
  };

  // Dispatch
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Fns CRUD
  const showFormFn = (bool) => {
    dispatch({
      type: SHOW_FORM_PROJECT,
      payload: bool,
    });
  };

  const getProjectsFn = async () => {
    try {
      const response = await clientAxios.get('/api/projects');
      const { data } = response.data;

      dispatch({
        type: GET_PROJECTS,
        payload: data.values,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addProjectFn = async (project) => {
    try {
      const response = await clientAxios.post('/api/projects', project);
      const { data } = response.data;
      dispatch({
        type: ADD_PROJECT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showErrorFn = (bool) => {
    dispatch({
      type: ERROR_FORM,
      payload: bool,
    });
  };

  const selectedProjectFn = (projectId) => {
    dispatch({
      type: SELECTED_PROJECT,
      payload: projectId,
    });
  };

  const deleteProjectFn = async (projectId) => {
    try {
      await axiosClient.delete(`/api/projects/${projectId}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      const { message } = error.response.data;

      const alert = {
        msg: message,
        category: 'alert-error',
      };

      dispatch({
        type: ERROR_PROJECTS,
        payload: alert,
      });
    }
  };

  return (
    <projectContext.Provider value={{
      ...state,
      showFormFn,
      addProjectFn,
      showErrorFn,
      selectedProjectFn,
      deleteProjectFn,
      getProjectsFn,
    }}
    >
      {children}
    </projectContext.Provider>
  );
};

ProjectState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProjectState;
