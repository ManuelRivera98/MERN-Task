import express from 'express';
import { body, validationResult } from 'express-validator';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Services
import UsersService from '../services/users';
import ApiKeysService from '../services/apiKeys';
// Schemas
import userSchema from '../utils/schemas/users';

// Conf
import config from '../config';

const AuthApi = (app) => {
  const router = express.Router();
  app.use('/api/auth', router);

  // Instance service
  const usersService = new UsersService();
  const apiKeysService = new ApiKeysService();

  router.post('/sign-up',
    // Validations middleware express-validator
    body('email', 'Add a valid email.').isEmail(),
    async (req, res, next) => {
      const { body: data } = req;

      try {
        // Validations middleware express.validator
        validationResult(req).throw();

        const user = await usersService.createUser(data, userSchema);

        res.status(201).json({
          ok: true,
          data: user,
        });
      } catch (error) {
        next(error);
      }
    });

  router.post('/login', async (req, res, next) => {
    const { email, password, apiKeyToken } = req.body;

    console.log(apiKeyToken, 'IM here');

    if (!apiKeyToken) return next(boom.unauthorized('apiKeyToken is require.'));

    if (!email || !password) return next(boom.badRequest('Email and password are require.'));

    try {
      const users = await usersService.getUsers(userSchema, {}, email);
      const user = users.values[0];

      if (!user) return next(boom.badRequest('Wrong email or password.'));

      // Validation password bcrypt
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) return next(boom.badRequest('Wrong email or password.'));

      // Validation apiKetToken DB
      const apiKey = await apiKeysService.getApiKey(apiKeyToken);
      if (apiKey.total === 0) return next(boom.unauthorized());

      const payload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        scopes: apiKey.values[0].scopes,
      };

      // Generate token
      const token = jwt.sign(payload, config.authJsonWebTokenSecret, { expiresIn: '1h' });

      res.status(200).json({
        ok: true,
        data: user,
        token,
      });
    } catch (error) {
      next(error);
    }
  });
};

export default AuthApi;
