import React, { useReducer } from 'react';
import { v4 as uuidV4 } from 'uuid';
// PropTypes
import PropTypes from 'prop-types';
// Context
import projectContext from './context';
// Reducer
import projectReducer from './reducer';
// Types
import {
  SHOW_FORM_PROJECT, ADD_PROJECT, ERROR_FORM, SELECTED_PROJECT, DELETE_PROJECT,
} from '../../types';

const ProjectState = ({ children }) => {
  const initialState = {
    projects: [
      { name: 'Tienda virtual', id: 1 },
      { name: 'Stack MERN', id: 2 },
      { name: 'Stack with LARAVEL', id: 3 },
      { name: 'Stack with NODE JS', id: 4 },
    ],
    showForm: false,
    error: false,
    selectedProject: {},
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

  const addProjectFn = (project) => {
    const addIdProject = { ...project, id: uuidV4() };
    dispatch({
      type: ADD_PROJECT,
      payload: addIdProject,
    });
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

  const deleteProjectFn = (projectId) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: projectId,
    });
  };

  return (
    <projectContext.Provider value={{
      ...state,
      showFormFn,
      addProjectFn,
      showErrorFn,
      selectedProjectFn,
      deleteProjectFn,
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
