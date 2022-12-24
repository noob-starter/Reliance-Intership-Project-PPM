import mongoose from "mongoose";

/* Create a Schema for the code master */
const codeMaster = new mongoose.Schema({
  codeId: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },

  typeId: {
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
export const User = mongoose.model("Code_Master", codeMaster);
