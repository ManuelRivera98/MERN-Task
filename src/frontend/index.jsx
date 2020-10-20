import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

import App from './App';

const history = createBrowserHistory();

ReactDOM.hydrate(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root'),
);
