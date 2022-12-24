import mongoose from "mongoose";

/* Create a Schema for the department master */
const departmentMaster = new mongoose.Schema({
  deptId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  desc: {
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
export const User = mongoose.model("Department_Master", departmentMaster);
export const DePart = User;
