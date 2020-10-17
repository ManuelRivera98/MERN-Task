import { Schema } from 'mongoose';

const projectSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name field is require.'],
  },
  user_id: {
    type: Schema.Types.ObjectId, ref: 'user',
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default projectSchema;
