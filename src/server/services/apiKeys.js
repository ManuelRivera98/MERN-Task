// Services
import MongoLib from '../lib/mongo';
// Schemas
import apiKeySchema from '../utils/schemas/apiKeys';

class ApiKeysService {
  constructor() {
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }

  async getApiKey(token) {
    const apiKey = await this.mongoDB.getAll(this.collection, apiKeySchema, { token }, {});
    return apiKey;
  }
}

export default ApiKeysService;
