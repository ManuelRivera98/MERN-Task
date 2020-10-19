import React, { useContext, useEffect } from 'react';
// Context
import projectContext from '../../context/projects/context';
import alertContext from '../../context/alerts/context';

// Components
import Project from './Project';

const ListProjects = () => {
  // Consume context's project
  const projectState = useContext(projectContext);
  const { projects, message, getProjectsFn } = projectState;
  // Consume context's project
  const alertState = useContext(alertContext);
  const { alert, showAlertFn } = alertState;

  useEffect(() => {
    if (message) return showAlertFn(message.msg, message.category);

    getProjectsFn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (projects.length === 0) return <p>No projects yet.</p>;

  return (
    <ul className="list-projects">
      { alert && <div className={`alert ${alert.category}`}>{alert.msg}</div>}
      { projects.map((project) => (
        <Project
          key={project._id}
          project={project}
        />
      ))}

    </ul>
  );
};

export default ListProjects;
