import express from 'express';
import boom from '@hapi/boom';

// Services
import UserService from '../services/users';
// Schemas
import userSchema from '../utils/schemas/users';
// Middleware
import jwtAuthentication from '../utils/middleware/authentication';
// Config
import config from '../config';

const usersApi = (app) => {
  const router = express.Router();
  app.use('/api/users', router);

  // Instances
  const userServices = new UserService();

  router.get('/auth',
    jwtAuthentication,
    async (req, res, next) => {
      const { sub } = req.user;

      try {
        const user = await userServices.getUser(userSchema, sub);
        const values = Object.keys(user);

        // Validation id mongo.
        if (user.id === config.invalidIdMessage) return next(boom.badData('Invalid id.'));
        // User exist.
        if (values.length === 0) return next(boom.badRequest('User does not exist.'));

        res.json({
          ok: true,
          data: user,
        });
      } catch (error) {
        next(error);
      }
    });
};

export default usersApi;
