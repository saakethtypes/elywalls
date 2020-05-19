const mongoose = require("mongoose");
const Poster = require("./Poster");
const Order = require("./Order");
const Artist = require("./Artist");
const Cart = require("./Cart");
require('mongoose-type-email');

const UserSchema = new mongoose.Schema({
  user_type:{type:String,default:"buyer"},
  name: {
    type: String,
    maxlength: 100,
    minlength: [1, "Name can not be empty"],
    required: [true, "Name is required"]
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    maxlength: 100,
    minlength: [1, "email can not be empty"],
    required: [true, "Email is required"]
  },
  username:{
    type:String,
    maxlength:30,
    required:[true,"Username is required"]
},
//TODO check phone length
  phone: {
      type:Number,
      maxlength:10,
      minlength:8,
      required:[true,"Phone number must be 10 digits"]
  },
  delivery_address: {
      type:[String],
      maxlength:250  },
  password: {
    type: String,
    minlength: [4, "Atleast 4 charecters required for a password"],
    required: [true, "Provide a password"]
  },

  confirmed:{
    type:Boolean,
    default:false
},
  admires: {type:[Poster.schema],defualt:[]},
  cart: {type:[Cart.schema],defualt:[]},
  order_history: {type:[Order.schema],defualt:[]},
  admired_artists: {type:[Artist.schema],defualt:[]},
  bought_posters: {type:[Poster.schema],defualt:[]},
  credit_card_info: {
      type:[String],
      default:["","",""]
  },
  
  createdAt: {
    type: Date,
    default: Date.now()
  },

});

module.exports = mongoose.model("User", UserSchema);
