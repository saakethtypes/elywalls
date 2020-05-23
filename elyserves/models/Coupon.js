const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  availedBy:{
      type:Number,
  },
  code: {
      type:String
  },
  value: {
    type: Number
  },
  validity:{
      type:Boolean
  },
  expiryAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("Coupon", CouponSchema);
