import mongoose from "mongoose";

/* Create a Schema for the grade master */
const gradeMaster = new mongoose.Schema({
  gradeId: {
    type: String,
    required: true,
  },

  gradeName: {
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
export const User = mongoose.model("Grade_Master", gradeMaster);
export const GradeUser = User;
