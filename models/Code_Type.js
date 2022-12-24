import mongoose from "mongoose";

/* Create a Schema for the code type */
const codeType = new mongoose.Schema({
  typeId: {
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

// Export the codeType variable
export const User = mongoose.model("Code_Type", codeType);
export const CodeTypeUser = User;
