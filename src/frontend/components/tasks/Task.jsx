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
    deleteTaskFn, getTasksProjectFn, updateTaskFn, selectedTaskFn,
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
          status: !task.status,
        };

        updateTaskFn(changedStatusTask);
        // Update tasks
        getTasksProjectFn(project._id);
        break;
      }
      case 'editTask':
        selectedTaskFn(task);
        break;
      case 'deleteTask':
        deleteTaskFn(task._id, project._id);
        // update tasks
        getTasksProjectFn(project._id);
        break;
      default:
        break;
    }
  };

  return (
    <li className="task shadow">
      <p>{task.name}</p>
      <div className="state">
        {task.status
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
