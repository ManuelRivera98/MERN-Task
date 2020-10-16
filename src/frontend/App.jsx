import React from 'react';
// React router Dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Context
import ProjectState from './context/projects/state';
import TaskState from './context/tasks/state';

// Components
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Projects from './components/projects/Projects';

const App = () => (
  <ProjectState>
    <TaskState>
      <Router>
        <Switch>
          <Route exact path="/" component={Projects} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/projects" component={Login} />
        </Switch>
      </Router>
    </TaskState>
  </ProjectState>
);

export default App;
