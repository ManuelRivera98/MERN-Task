import mongoose from 'mongoose';
import config from '../config';

// Prod
const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
// Dev
const URI_LOCAL = `mongodb://${config.dbLocalHost}/${config.dbName}`;

class MongoLib {
  constructor() {
    this.client = mongoose;
  }

  async connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = await this.client.connect(config.dev ? URI_LOCAL : MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      console.log('DB connected');
    }

    return MongoLib.connection;
  }

  async create(collection, schema, data) {
    const Model = this.client.model(collection, schema);

    await this.connect();
    const doc = await Model.create(data);
    return doc;
  }

  async getAll(collection, schema, query, conditions, populate = []) {
    const { returnValues = '' } = conditions;
    const Model = this.client.model(collection, schema);

    await this.connect();
    const total = await Model.countDocuments(query);
    let docs = await Model.find(query, returnValues, {
      skip: 0, limit: 5,
    });

    if (populate.length > 0) {
      let Model2;
      populate.forEach(async (data) => {
        Model2 = this.client.model(data.collection, data.schema);
        docs = await Model2.populate(docs, { path: data.path });
      });
    }

    const res = {
      values: docs,
      total,
    };

    return res;
  }
}

export default MongoLib;
