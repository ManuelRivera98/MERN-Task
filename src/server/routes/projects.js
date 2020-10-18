import express from 'express';
import boom from '@hapi/boom';
import _ from 'underscore';

// Services
import ProjectsService from '../services/projects';

// Schemas
import projectSchema from '../utils/schemas/projects';
import userSchema from '../utils/schemas/users';

// Middleware
import jwtAuthentication from '../utils/middleware/authentication';
import isOwnerMiddleware from '../utils/middleware/isOwner';

// Conf
import config from '../config';

const projectsApi = (app) => {
  const router = express.Router();
  app.use('/api/projects', router);

  // Instance services
  const projectsService = new ProjectsService();

  router.post('/',
    jwtAuthentication,
    async (req, res, next) => {
      const { body: data, user } = req;

      const schemas = {
        projectSchema,
        userSchema,
      };

      try {
        const project = await projectsService.createProject(schemas, data, user.sub);

        res.status(201).json({
          ok: true,
          data: project,
        });
      } catch (error) {
        next(error);
      }
    });

  router.get('/',
    jwtAuthentication,
    async (req, res, next) => {
      const { user, query } = req;

      const schemas = {
        userSchema,
        projectSchema,
      };

      try {
        const projects = await projectsService.getProjects(schemas, query, user.sub);

        res.status(200).json({
          ok: true,
          data: projects,
        });
      } catch (error) {
        next(error);
      }
    });

  router.get('/:_id',
    jwtAuthentication,
    isOwnerMiddleware('project', projectSchema, '_id', 'user_id'),
    async (req, res, next) => {
      const { _id } = req.params;

      const schemas = {
        userSchema,
        projectSchema,
      };

      try {
        const project = await projectsService.getProject(schemas, _id);
        const values = Object.keys(project);

        // Validations id mongo
        if (project.id === config.invalidIdMessage) return next(boom.badData('Invalid id.'));
        // Project exist
        if (values.length === 0) return next(boom.notFound('Project does not exist.'));

        res.json({
          ok: true,
          data: project,
        });
      } catch (error) {
        next(error);
      }
    });

  router.put('/:_id',
    jwtAuthentication,
    isOwnerMiddleware('project', projectSchema, '_id', 'user_id'),
    async (req, res, next) => {
      const { body } = req;
      const { _id } = req.params;

      // Remove extra values
      const data = _.pick(body, ['name']);

      const schemas = {
        userSchema,
        projectSchema,
      };

      try {
        const project = await projectsService.updateProject(schemas, _id, data);
        const values = Object.keys(project);

        // Validation id mongo.
        if (project.id === config.invalidIdMessage) return next(boom.badData('Invalid id.'));
        // Project exist.
        if (values.length === 0) return next(boom.notFound('Project does not exist.'));

        res.json({
          ok: true,
          data: project,
        });
      } catch (error) {
        next(error);
      }
    });

  router.delete('/:_id',
    jwtAuthentication,
    isOwnerMiddleware('project', projectSchema, '_id', 'user_id'),
    async (req, res, next) => {
      const { _id } = req.params;

      try {
        const project = await projectsService.deleteProject(projectSchema, _id);
        const values = Object.keys(project);

        // Validation id mongo.
        if (project.id === config.invalidIdMessage) return next(boom.badData('Invalid id.'));
        // Project exist.
        if (values.length === 0) return next(boom.notFound('Project does not exist.'));

        res.status(204).json({
          ok: true,
          data: project,
        });
      } catch (error) {
        next(error);
      }
    });
};

export default projectsApi;
