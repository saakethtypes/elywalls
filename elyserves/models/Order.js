const mongoose = require("mongoose");
const Cart = require("./Cart");
const User = require("./User");

const OrderSchema = new mongoose.Schema({
    purchased: {
    type: [Cart.schema]
  },
    purchasedBy:{
        type:[User.schema]
    },
    payment_status:{
        type:Boolean
    },
    total_price:{
      type:Number
    },
  orderedOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", OrderSchema);
