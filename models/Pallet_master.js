import mongoose from "mongoose";

/* Create a Schema for the pallet master */
const palletMaster = new mongoose.Schema({
  palletNo: {
    type: String,
    required: true,
  },

  productId: {
    type: String,
    required: true,
  },

  noOfRolls: {
    type: String,
    required: true,
  },

  grade: {
    type: String,
    required: true,
  },

  start_dt: {
    type: String,
  },

  end_dt: {
    type: String,
  },

  created_dt: {
    type: String,
  },

  created_by: {
    type: String,
  },

  status: {
    type: String,
    required: true,
  },

  batch: {
    type: String,
    required: true,
  },
});

// Export the user_Master variable
export const User = mongoose.model("Pallet_Master", palletMaster);
export const PalletUser = User;
