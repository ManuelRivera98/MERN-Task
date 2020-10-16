import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The field name is require.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'The field email is require.'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'The field password is require.'],
    select: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
};

userSchema.plugin(uniqueValidator, { message: 'Another user is already using this {PATH}, try another' });

export default userSchema;
