import boom from '@hapi/boom';
// Lib
import MongoLib from '../../lib/mongo';

const isOwner = (collection, schema, search, path, where = 'params') => async (req, res, next) => {
  // Instance
  const mongoDB = new MongoLib();

  const value = req[where][search];

  if (!value) next(boom.badRequest(`${search} is require.`));

  const query = {
    [search]: value,
  };

  try {
    const docs = await mongoDB.getAll(collection, schema, query, {});
    const doc = docs.values[0] || {};

    // not found db
    if (Object.keys(doc).length === 0) return next(boom.notFound('There are no records in the database.'));

    const userRequest = req.user.sub;
    const pathDB = doc[path];

    if (userRequest !== pathDB.toString()) return next(boom.unauthorized('You do not have permission.'));

    // is owner
    next();
  } catch (error) {
    next(error);
  }
};

export default isOwner;
