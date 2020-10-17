import jwt from 'jsonwebtoken';
import boom from '@hapi/boom';

// Conf
import config from '../../config';

const jwtAuthentication = (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) return next(boom.unauthorized('Token is require.'));

  try {
    const payload = jwt.verify(token, config.authJsonWebTokenSecret);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export default jwtAuthentication;
