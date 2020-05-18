const mongoose = require("mongoose");
const Poster = require('./Poster');
const User = require('./User');

const CartSchema = new mongoose.Schema({
  item: {
   type: [Poster.schema]
  },
  quantity: {
    type: Number
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