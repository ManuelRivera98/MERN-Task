import React, { useContext } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Context
import taskContext from '../../context/tasks/context';
import projectContext from '../../context/projects/context';

const Task = ({ task }) => {
  // Consume task context
  const taskState = useContext(taskContext);
  const {
    deleteTaskFn, getTasksProjectFn, changeStatusTaskFn, selectedTaskFn,
  } = taskState;
  // Consume project context
  const projectState = useContext(projectContext);
  const { selectedProject } = projectState;
  // array deconstruct
  const [project] = selectedProject;

  const handleClick = (type) => {
    switch (type) {
      case 'changeStateTask': {
        const changedStatusTask = {
          ...task,
          state: !task.state,
        };

        changeStatusTaskFn(changedStatusTask);
        // Update tasks
        getTasksProjectFn(project.id);
        break;
      }
      case 'editTask':
        selectedTaskFn(task);
        break;
      case 'deleteTask':
        deleteTaskFn(task.id);
        // update tasks
        getTasksProjectFn(project.id);
        break;
      default:
        break;
    }
  };

  return (
    <li className="task shadow">
      <p>{task.name}</p>
      <div className="state">
        {task.state
          ? <button type="button" className="complete" onClick={() => handleClick('changeStateTask')}>Complete</button>
          : <button type="button" className="incomplete" onClick={() => handleClick('changeStateTask')}>Incomplete</button>}
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleClick('editTask')}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-second"
          onClick={() => handleClick('deleteTask')}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

Task.defaultProps = {
  task: {},
};

Task.propTypes = {
  task: PropTypes.objectOf(PropTypes.any),
};

export default Task;
