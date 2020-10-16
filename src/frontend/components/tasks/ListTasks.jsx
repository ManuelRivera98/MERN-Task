import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Context
import projectContext from '../../context/projects/context';
import taskContext from '../../context/tasks/context';
// Components
import Task from './Task';

const ListTasks = () => {
  // Consume project context
  const projectState = useContext(projectContext);
  const { selectedProject, deleteProjectFn } = projectState;
  // Consume task context
  const taskState = useContext(taskContext);
  const { tasksProject = [] } = taskState;

  if (Object.keys(selectedProject).length === 0) return <h1>Select a project.</h1>;

  // Array deconstruct
  const [project] = selectedProject;

  return (
    <>
      <h2>
        Project:
        {' '}
        {project.name}
      </h2>
      <ul className="list-tasks">
        {tasksProject.length === 0 ? <li className="task">No homework</li>
          : (
            <TransitionGroup>
              {tasksProject.map((task) => (
                <CSSTransition
                  key={task.id}
                  timeout={200}
                >
                  <Task
                    task={task}
                    className="task"
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
      </ul>
      <button
        type="button"
        className="btn btn-delete"
        onClick={() => deleteProjectFn(project.id)}
      >
        Delete project &times;
      </button>
    </>
  );
};

export default ListTasks;
