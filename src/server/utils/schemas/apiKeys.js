import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const apiKeySchema = new Schema({
  token: {
    type: String,
    required: [true, 'The field token is require.'],
  },
  scopes: {
    type: [String],
    default: [],
  },
});

apiKeySchema.plugin(uniqueValidator, { message: 'The {PATH} must be unique.' });

export default apiKeySchema;
