import mongoose from "mongoose";

/* Create a Schema for the code master */
const productionMaster = new mongoose.Schema({
  productionId: {
    type: String,
  },

  production_dt: {
    type: String,
  },

  trackNo: {
    type: String,
  },

  palletNo: {
    type: String,
  },

  productId: {
    type: String,
  },

  grade: {
    type: String,
  },

  netWeight: {
    type: String,
  },

  packedBy: {
    type: String,
  },

  packed_dt: {
    type: String,
  },

  grossWeight: {
    type: String,
  },

  tareWeight: {
    type: String,
  },

  batch: {
    type: String,
  },
  created_dt: {
    type: String,
  },

  created_by: {
    type: String,
  },
});

// Export the user_Master variable
export const User = mongoose.model("Daily_Production_Master", productionMaster);
