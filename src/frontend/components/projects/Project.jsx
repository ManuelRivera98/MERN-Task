import React, { useContext, useEffect } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Context
import projectContext from '../../context/projects/context';
import taskContext from '../../context/tasks/context';
import authContext from '../../context/auth/context';

const Project = ({ project }) => {
  // Consume project context
  const projectState = useContext(projectContext);
  const { selectedProjectFn } = projectState;
  // Consume task context
  const taskState = useContext(taskContext);
  const { getTasksProjectFn } = taskState;
  // Consume auth context
  const authState = useContext(authContext);
  const { userAuthorizationFn } = authState;

  // Observer actions user
  useEffect(() => {
    userAuthorizationFn();
  }, []);

  const handleClick = () => {
    selectedProjectFn(project._id);
    getTasksProjectFn(project._id);
  };

  return (
    <button
      type="button"
      className="btn btn-blank"
      onClick={handleClick}
    >
      {project.name}
    </button>
  );
};

Project.defaultProps = {
  project: {},
};

Project.propTypes = {
  project: PropTypes.objectOf(PropTypes.any),
};

export default Project;
