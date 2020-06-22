const mongoose = require("mongoose");
const Poster = require('./Poster');
const User = require('./User');

const CartSchema = new mongoose.Schema({
  item: {
   type:{type:Poster.Schema}
  },
  quantity: {
    type: Number,
    default:1
  },
  price_with_quantity: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Cart", CartSchema);