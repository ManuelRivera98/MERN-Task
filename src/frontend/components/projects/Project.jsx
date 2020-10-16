import React, { useContext } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Context
import projectContext from '../../context/projects/context';
import taskContext from '../../context/tasks/context';

const Project = ({ project }) => {
  // Consume project context
  const projectState = useContext(projectContext);
  const { selectedProjectFn } = projectState;
  // Consume task context
  const taskState = useContext(taskContext);
  const { getTasksProjectFn } = taskState;

  const handleClick = () => {
    selectedProjectFn(project.id);
    getTasksProjectFn(project.id);
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
  project: PropTypes.objectOf(PropTypes.node),
};

export default Project;
