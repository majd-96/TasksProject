import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  password: String,
  name: String,
  title: String,
  gender: String,
  education: String,
  experience: String,
  expNumber: { type: Number, min: 1, max: 10, required: true },
  createdAt: { type: Date, default: Date.now() }
});

const User = model('User', UserSchema);

export default User;
