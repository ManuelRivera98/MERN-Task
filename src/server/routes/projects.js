import express from 'express';
import ProjectsService from '../services/projects';

// Schemas
import projectSchema from '../utils/schemas/projects';
import userSchema from '../utils/schemas/users';

// Middleware
import jwtAuthentication from '../utils/middleware/authentication';

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
};

export default projectsApi;
