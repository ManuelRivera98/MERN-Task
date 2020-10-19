import React from 'react';
// React router Dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Context
import ProjectState from './context/projects/state';
import TaskState from './context/tasks/state';
import AlertState from './context/alerts/state';
import AuthState from './context/auth/state';

// Components
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Projects from './components/projects/Projects';
// HOR Private Route
import HOCPrivateRoute from './components/HigherOrderComponent/PrivateRoute';

// config auth token
import authToken from './config/authToken';

// Validation token localStorage
const token = localStorage.getItem('token');
if (token) {
  authToken(token);
}

const App = () => (
  <ProjectState>
    <TaskState>
      <AlertState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/">
                <Login />
              </Route>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <HOCPrivateRoute exact path="/projects" component={Projects} />
            </Switch>
          </Router>
        </AuthState>
      </AlertState>
    </TaskState>
  </ProjectState>
);

export default App;
