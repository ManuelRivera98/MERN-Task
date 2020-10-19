import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Controllers
import authApi from './routes/auth';
import usersApi from './routes/users';
import projectsApi from './routes/projects';
import tasksApi from './routes/tasks';

// Conf
import config from './config';

// Middleware
import notFoundHandler from './utils/middleware/notFoundHandler';
import { logErrors, wrapErrors, errorHandler } from './utils/middleware/errorsHandler';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Cors available
app.use(cors());

// Routes
authApi(app);
projectsApi(app);
tasksApi(app);
usersApi(app);

// Catch not found 404
app.use(notFoundHandler);

// Errors middleware handler
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, (error) => {
  if (error) return console.error(error);

  return console.log(`Listening http://localhost:${config.port}`);
});
