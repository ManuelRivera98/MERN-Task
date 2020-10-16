import React, { useContext, useState, useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';

// Context
import projectContext from '../../context/projects/context';
import taskContext from '../../context/tasks/context';

const FormTask = () => {
  // State
  const [task, setTask] = useState({
    name: '',
  });
  const { name } = task;

  // Consume project context
  const projectState = useContext(projectContext);
  const { selectedProject } = projectState;
  // Consume task context
  const taskState = useContext(taskContext);
  const {
    selectedTask, error, addTaskFn, showErrorFn, getTasksProjectFn,
    updateTaskFn, changeSelectedTaskValueFn,
  } = taskState;

  useEffect(() => {
    if (Object.keys(selectedTask).length > 0) return setTask(selectedTask);
    return setTask({ name: '' });
  }, [selectedTask]);

  if (Object.keys(selectedProject).length === 0) return null;

  // Array deconstruct
  const [project] = selectedProject;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validations
    if (name.trim() === '') return showErrorFn(true);

    // Update or create
    if (Object.keys(selectedTask).length > 0) {
      updateTaskFn(task);
      // Reset selectedTask
      changeSelectedTaskValueFn({});
    } else {
      const addTask = {
        ...task,
        id: uuidV4(),
        projectId: project.id,
        state: false,
      };
      addTaskFn(addTask);
    }

    showErrorFn(false);
    // Update tasks
    getTasksProjectFn(project.id);

    // Reset inputs
    return setTask({
      name: '',
    });
  };

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="form">
      <form
        onSubmit={handleSubmit}
      >
        <div className="content-input">
          <input
            type="text"
            name="name"
            value={name}
            className="input-text"
            placeholder="Name of the homework"
            onChange={handleChange}
          />
        </div>

        <div className="content-input">
          <input
            type="submit"
            value={Object.keys(selectedTask).length > 0 ? 'Edit task' : 'Add task'}
            className="btn btn-primary btn-submit btn-block"
          />
        </div>
      </form>
      { error && <p className="message error">The name of the task is required</p>}
    </div>
  );
};

export default FormTask;
