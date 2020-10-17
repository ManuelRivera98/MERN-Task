import MongoLib from '../lib/mongo';

class ProjectsService {
  constructor() {
    this.collection = 'project';
    this.mongoDB = new MongoLib();
  }

  async createProject(schemas, data, user_id) {
    const { userSchema, projectSchema } = schemas;

    const populate = [
      { collection: 'user', schema: userSchema, path: 'user_id' },
    ];

    const newData = {
      ...data,
      user_id,
    };

    const project = await this.mongoDB.create(
      this.collection, projectSchema, newData, populate,
    );
    return project;
  }

  async getProjects(schemas, conditions, user_id) {
    const { userSchema, projectSchema } = schemas;

    const query = {
      user_id,
    };

    const populate = [
      { collection: 'user', schema: userSchema, path: 'user_id' },
    ];

    const projects = this.mongoDB.getAll(
      this.collection, projectSchema, query, conditions, populate,
    );
    return projects;
  }
}

export default ProjectsService;
