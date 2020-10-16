import React from 'react';

// Components
import Sidebar from '../layout/Sidebar';
import NavBar from '../layout/NavBar';
import FormRask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';

const Projects = () => (
  <div className="content-app">
    <Sidebar />
    <div className="section-principal">
      <NavBar />
      <main>
        <FormRask />
        <div className="content-tasks">
          <ListTasks />
        </div>
      </main>
    </div>
  </div>
);

export default Projects;
