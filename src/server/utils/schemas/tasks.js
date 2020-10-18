import { Schema } from 'mongoose';

const tasksSchemas = new Schema({
  name: {
    type: String,
    required: [true, 'The field name is require.'],
  },
  status: {
    type: Boolean,
    default: false,
  },
  project_id: {
    type: Schema.Types.ObjectId,
    ref: 'project',
    required: [true, 'The project_id is require.'],
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

export default tasksSchemas;
