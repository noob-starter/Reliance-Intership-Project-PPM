import mongoose from "mongoose";
// import {autoIncrement} from 'mongoose-auto-increment-reworked';

/* Create a Schema for the user master */
const userMaster = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  dept: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  created_dt: {
    type: String,
  },

  created_by: {
    type: String,
  },

  modify_dt: {
    type: String,
  },

  modify_by: {
    type: String,
  },
});

// Export the user_Master variable
export const User = mongoose.model("User_Master", userMaster);
export const LoginUsers = User;
