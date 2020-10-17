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

  async create(collection, schema, data, populate = []) {
    const Model = this.client.model(collection, schema);

    await this.connect();
    let doc = await Model.create(data);

    if (populate.length > 0) {
      let Model2;
      const promises = populate.map(async (value) => {
        Model2 = this.client.model(value.collection, value.schema);
        doc = await Model2.populate(doc, { path: value.path });
      });

      await Promise.all(promises);
    }

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
      const promises = populate.map(async (data) => {
        Model2 = this.client.model(data.collection, data.schema);
        docs = await Model2.populate(docs, { path: data.path });
        return docs;
      });

      await Promise.all(promises);
    }

    const res = {
      values: docs,
      total,
    };

    return res;
  }

  async get(collection, schema, id, conditions, query, populate = []) {
    const Model = this.client.model(collection, schema);

    const { returnValues = '' } = conditions;

    const isValid = this.client.Types.ObjectId.isValid(id);

    if (!isValid) return { id: config.invalidIdMessage };

    await this.connect();
    let doc = await Model.findById(id, returnValues).where(query);

    if (populate.length > 0) {
      let Model2;
      const promises = populate.map(async (data) => {
        Model2 = this.client.model(data.collection, data.schema);
        doc = await Model2.populate(doc, { path: data.path });
      });

      await Promise.all(promises);
    }

    return doc;
  }

  async update(
    collection, schema, id, data, query, populate = [],
  ) {
    const Model = this.client.model(collection, schema);

    const isValid = this.client.Types.ObjectId.isValid(id);

    if (!isValid) return { id: config.invalidIdMessage };

    await this.connect();
    // Return new doc and run validations schema
    let doc = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .where(query);

    if (populate.length > 0) {
      let Model2;
      const promises = populate.map(async (value) => {
        Model2 = this.client.model(value.collection, value.schema);
        doc = await Model2.populate(doc, { path: value.path });
      });

      await Promise.all(promises);
    }

    return doc;
  }

  async delete(collection, schema, id) {
    const Model = this.client.model(collection, schema);

    const isValid = this.client.Types.ObjectId.isValid(id);

    if (!isValid) return { id: config.invalidIdMessage };

    await this.connect();
    const doc = await Model.findById(id).where({ status: true });

    if (!doc) return undefined;

    doc.status = false;
    const docUpdated = await doc.save();

    return docUpdated;
  }

  async removeDB(collection, schema, id) {
    const Model = this.client.model(collection, schema);

    const isValid = this.client.Types.ObjectId.isValid(id);

    if (!isValid) return { id: config.invalidIdMessage };

    await this.connect();
    const doc = await Model.findByIdAndDelete(id);

    return doc;
  }
}

export default MongoLib;
