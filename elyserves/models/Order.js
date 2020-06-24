const mongoose = require("mongoose");
const Cart = require("./Cart");
const Artist = require("./Artist");

const OrderSchema = new mongoose.Schema({
  purchased_items: {
    type: [Cart.schema]
  },
    purchasedBy:{
        type:[String],
    },
    payment_status:{
        type:Boolean
    },
    billing_adress:{
      type:String,
    },
    transaction_id:{
      type:String
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
