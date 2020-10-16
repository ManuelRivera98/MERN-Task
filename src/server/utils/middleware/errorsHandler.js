import boom from '@hapi/boom';
import config from '../../config';

const withErrorStack = (error, stack) => {
  if (config.dev) {
    return { ...error, stack };
  }

  return error;
};

export const logErrors = (error, req, res, next) => {
  console.log(error);
  next(error);
};

export const wrapErrors = (error, req, res, next) => {
  if (!error.isBoom) {
    next(boom.badImplementation(error));
  }

  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, _next) => {
  const { output: { statusCode, payload }, errors } = error;

  const err = errors || payload;
  const status = errors ? 400 : statusCode;

  res.status(status).json(withErrorStack(err, error.stack));
};
