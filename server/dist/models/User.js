"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const UserSchema = new _mongoose.Schema({
  email: String,
  password: String,
  name: String,
  title: String,
  gender: String,
  education: String,
  experience: String,
  isApproved: Boolean,
  isAdmin: Boolean,
  expNumber: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
const User = (0, _mongoose.model)('User', UserSchema);
var _default = User;
exports.default = _default;