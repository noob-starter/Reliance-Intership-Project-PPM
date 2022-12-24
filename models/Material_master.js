import mongoose from "mongoose";

/* Create a Schema for the code master */
const materialMaster = new mongoose.Schema({
  materialId: {
    type: String,
    required: true,
  },

  materialType: {
    type: String,
    required: true,
  },

  materialDesc: {
    type: String,
    required: true,
  },

  materialRemarks: {
    type: String,
    required: true,
  },

  created_dt: {
    type: String,
  },

  created_by: {
    type: String,
  },
});

// Export the user_Master variable
export const User = mongoose.model("Material_Master", materialMaster);
export const MaterialUser = User;
