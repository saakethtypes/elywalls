const mongoose = require("mongoose");
const Poster = require("./Poster");
const Order = require("./Order");
const Cart = require("./Cart");
require('mongoose-type-email');

const ArtistSchema = new mongoose.Schema({
    user_type:{type:String,default:"artist"},
  name: {
    type: String,
    maxlength: 100,
    minlength: [1, "Name can not be empty"],
    required: [true, "Name is required"]
  },
  username:{
      type:String,
      maxlength:30,
      required:[true,"Username is required"]
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    maxlength: 100,
    minlength: [1, "email can not be empty"],
    required: [true, "Email is required"]
  },
  phone: {
      type:Number,
      maxlength:10,
      minlength:10,
      required:[true,"Phone number must be 10 digits"]
  },
  delivery_address: {
      type:[String],
      maxlength:250,
      required:false,
       default:""
  },
  password: {
    type: String,
    minlength: [6, "Atleast 6 charecters required for a password"],
    required: [true, "Provide a password"]
  },
  confirmed:{
      type:Boolean,
      default:false
  },

  admires: {type:[Poster.schema],defualt:[]},
  cart: {type:[Cart.schema],defualt:[]},
  order_history: {type:[Order.schema],defualt:[]},
  admired_artists: {type:[],default:[]},
  bought_posters: {type:[Poster.schema],defualt:[]},
  credit_card_info: {
      type:[String],
      default:["","",""]
  },
  dpURL: {
    type: String,
  },
  linkedIG:{
      type:String,
      required:false
  },
  quote:{
      type:String,
      required:false,
      maxlength:350,
      default: "Hi! Check out my work down below"
  },

  postersmade:{
      type:[Poster.schema],
      defualt:0
  },

  fans:{
      type:Number,
      default:1
  },



  total_profit:{
    type:Number,
    default:0
  },


  featured:{
      type:Boolean,
      default:false
  },

  bestSeller:{
      type:Boolean,
      default:false
  },

  current_week_sales:{
      type:Number,
      default:0
  },
  
  profileViews:{
      type:Number,
      default:1
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

});

module.exports = mongoose.model("Artist", ArtistSchema);