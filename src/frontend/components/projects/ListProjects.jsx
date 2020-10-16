import React, { useContext } from 'react';
// Context
import projectContext from '../../context/projects/context';

// Components
import Project from './Project';

const ListProjects = () => {
  // Consume context's project
  const projectState = useContext(projectContext);
  const { projects } = projectState;

  if (projects.length === 0) return <p>No projects yet.</p>;

  return (
    <ul className="list-projects">
      { projects.map((project) => (
        <Project
          key={project.id}
          project={project}
        />
      ))}

    </ul>
  );
};

export default ListProjects;
