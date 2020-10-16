import React from 'react';

// Components
import NewProject from '../projects/NewProject';
import ListProjects from '../projects/ListProjects';

const Sidebar = () => (
  <aside>
    <h1>
      MERN
      <span>Tasks</span>
    </h1>
    <NewProject />
    <div className="projects">
      <h2>Your Projects</h2>

      <ListProjects />
    </div>
  </aside>
);

export default Sidebar;
