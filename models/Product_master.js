import mongoose from "mongoose";

/* Create a Schema for the product master */
const productMaster = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },

  materialId: {
    type: String,
    required: true,
  },

  productDesc: {
    type: String,
    required: true,
  },

  productRemarks: {
    type: String,
    required: true,
  },

  created_dt: {
    type: String,
  },

  created_by: {
    type: String,
  },

  maxRolls: {
    type: String,
    required: true,
  },
});

// Export the user_Master variable
export const User = mongoose.model("Product_Master", productMaster);
export const ProductUser = User;
