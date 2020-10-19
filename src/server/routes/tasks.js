import express from 'express';
import boom from '@hapi/boom';
import _ from 'underscore';
import mongoose from 'mongoose';

// Services
import TasksServices from '../services/tasks';

// Schemas
import taskSchema from '../utils/schemas/tasks';
import projectSchema from '../utils/schemas/projects';

// Middleware
import jwtAuthentication from '../utils/middleware/authentication';
import isOwnerMiddleware from '../utils/middleware/isOwner';

// Conf
import config from '../config';

const tasksApi = (app) => {
  const router = express.Router();
  app.use('/api/tasks', router);

  // Instance services
  const tasksServices = new TasksServices();

  router.post('/',
    jwtAuthentication,
    isOwnerMiddleware('project', projectSchema, '_id', 'user_id', 'body'),
    async (req, res, next) => {
      const { body: data } = req;

      const schemas = {
        taskSchema,
        projectSchema,
      };

      try {
        const task = await tasksServices.createTask(schemas, data);

        res.status(201).json({
          ok: true,
          data: task,
        });
      } catch (error) {
        next(error);
      }
    });

  router.get('/',
    jwtAuthentication,
    isOwnerMiddleware('project', projectSchema, '_id', 'user_id', 'query'),
    async (req, res, next) => {
      const { query } = req;
      const { _id } = req.query;

      if (!_id) return next(boom.badRequest('Project id is require.'));
      // Validation id mongo
      if (!mongoose.Types.ObjectId.isValid(_id)) return next(boom.badData('Invalid id.'));

      const schemas = {
        projectSchema,
        taskSchema,
      };
      try {
        const tasks = await tasksServices.getTasks(schemas, query, _id);

        res.json({
          ok: true,
          data: tasks,
        });
      } catch (error) {
        next(error);
      }
    });

  router.put('/:_id',
    jwtAuthentication,
    isOwnerMiddleware('project', projectSchema, '_id', 'user_id', 'query'),
    async (req, res, next) => {
      const { body } = req;
      const { _id } = req.params;

      // Remove extra values
      const data = _.pick(body, ['name', 'status']);

      const schemas = {
        projectSchema,
        taskSchema,
      };

      try {
        const task = await tasksServices.updateTask(schemas, _id, data);
        const values = Object.keys(task);

        // Validation id mongo
        if (task.id === config.invalidIdMessage) return next(boom.badData('Invalid id.'));
        // task exist.
        if (values.length === 0) return next(boom.notFound('Task does not exist.'));

        res.json({
          ok: true,
          data: task,
        });
      } catch (error) {
        next(error);
      }
    });

  router.get('/:_id',
    jwtAuthentication,
    isOwnerMiddleware('project', projectSchema, '_id', 'user_id', 'body'),
    async (req, res, next) => {
      const { _id } = req.params;

      const schemas = {
        projectSchema,
        taskSchema,
      };

      try {
        const task = await tasksServices.getTask(schemas, _id);
        const values = Object.keys(task);

        // Validation id mondo
        if (task.id === config.invalidIdMessage) return next(boom.badData('Invalid id.'));
        // task exist.
        if (values.length === 0) return next(boom.badRequest('Task does not exist.'));

        res.json({
          ok: true,
          data: task,
        });
      } catch (error) {
        next(error);
      }
    });

  router.delete('/:_id',
    jwtAuthentication,
    isOwnerMiddleware('project', projectSchema, '_id', 'user_id', 'query'),
    async (req, res, next) => {
      const { _id } = req.params;

      try {
        const task = await tasksServices.deleteTask(taskSchema, _id);
        const values = Object.keys(task);

        // Validation id mongo
        if (task.id === config.invalidIdMessage) return next(boom.badData('Invalid id.'));
        // Task exist.
        if (values.length === 0) return next(boom.badRequest('Task does not exist.'));

        res.status(204).json({
          ok: true,
          data: task,
        });
      } catch (error) {
        next(error);
      }
    });
};

export default tasksApi;
