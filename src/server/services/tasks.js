// Lib
import MongoLib from '../lib/mongo';

class TasksService {
  constructor() {
    this.collection = 'task';
    this.mongoDB = new MongoLib();
  }

  async createTask(schemas, data) {
    const { taskSchema, projectSchema } = schemas;

    const populate = [
      { collection: 'project', schema: projectSchema, path: 'project_id' },
    ];
    const task = await this.mongoDB.create(this.collection, taskSchema, data, populate);
    return task;
  }

  async getTasks(schemas, conditions, project_id) {
    const { projectSchema, taskSchema } = schemas;

    const query = {
      project_id,
    };

    const populate = [
      { collection: 'project', schema: projectSchema, path: 'project_id' },
    ];
    const tasks = await this.mongoDB.getAll(
      this.collection, taskSchema, query, conditions, populate,
    );
    return tasks;
  }

  async getTask(schemas, id) {
    const { projectSchema, taskSchema } = schemas;
    const conditions = {
      returnValues: 'name state project_id created',
    };

    const populate = [
      { collection: 'project', schema: projectSchema, path: 'project_id' },
    ];

    const task = await this.mongoDB.get(this.collection, taskSchema, id, conditions, {}, populate);
    return task || {};
  }

  async updateTask(schemas, id, data) {
    const { projectSchema, taskSchema } = schemas;

    const populate = [
      { collection: 'project', schema: projectSchema, path: 'project_id' },
    ];
    const task = await this.mongoDB.update(this.collection, taskSchema, id, data, {}, populate);
    return task || {};
  }

  async deleteTask(schema, id) {
    const task = await this.mongoDB.removeDB(this.collection, schema, id);
    return task || {};
  }
}

export default TasksService;
