/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
// webpack
import webpack from 'webpack';

// Configuration ServerSideRendering.
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
// Context
import ProjectState from '../../frontend/context/projects/state';
import TaskState from '../../frontend/context/tasks/state';
import AlertState from '../../frontend/context/alerts/state';
import AuthState from '../../frontend/context/auth/state';
// server routes
import serverRoutes from '../../frontend/serverRoutes';

// Conf
import config from '../config';

// Middleware
import getManifest from '../utils/middleware/getManifest';

// SSR

const setResponse = (html, manifest) => {
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
  return (`
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="styles/main.css" type="text/css">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site MERN Task" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,900|Roboto:300,400,700&display=swap" rel="stylesheet">
    <title>MERN Tasks</title>
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      ${html}
    </div>
    <script type="text/javascript" >
    if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage('./scratch');
    }
  </script>
    <script src="${mainBuild}" type="text/javascript" ></script>
    <script src="${vendorBuild}" type="text/javascript" ></script>

  </body>

  </html>
  `);
};

const renderApp = (req, res) => {
  const html = renderToString(
    <ProjectState>
      <TaskState>
        <AuthState>
          <AlertState>
            <StaticRouter location={req.url} context={{}}>
              {renderRoutes(serverRoutes)}
            </StaticRouter>
          </AlertState>
        </AuthState>
      </TaskState>
    </ProjectState>,
  );

  res.send(setResponse(html, req.hashManifest));
};

const mernApi = (app) => {
  if (config.dev) {
    const webpackConfig = require('../../../webpack.config');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(webpackConfig);
    const serverConfig = { port: config.port, hot: true };

    app.use(webpackDevMiddleware(compiler, serverConfig));
    app.use(webpackHotMiddleware(compiler));
  } else {
    // Add manifest
    app.use((req, res, next) => {
      req.hashManifest = getManifest();
      next();
    });
  }

  const router = express.Router();
  app.use('*', router);

  router.get('*', renderApp);
};

export default mernApi;
