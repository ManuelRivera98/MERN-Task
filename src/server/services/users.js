import bcrypt from 'bcrypt';
import MongoLib from '../lib/mongo';

class UsersService {
  constructor() {
    this.collection = 'user';
    this.mongoDB = new MongoLib();
  }

  async createUser(data, schema) {
    const { password } = data;
    let newData = data;
    if (password) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      newData = {
        ...data,
        password: encryptedPassword,
      };
    }

    const user = await this.mongoDB.create(this.collection, schema, newData);
    return user;
  }

  async getUsers(schema, conditions, email = false) {
    // Add values that we are going to return
    const addConditions = {
      ...conditions,
      returnValues: 'name email password',
    };

    const query = email ? { email, status: true } : { status: true };

    const users = await this.mongoDB.getAll(this.collection, schema, query, addConditions);
    return users;
  }
}

export default UsersService;
