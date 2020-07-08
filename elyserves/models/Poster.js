const mongoose = require("mongoose");
const Artist = require("./Artist");

const PosterSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    minlength: [1, "Title can not be empty"],
    required: [true, "Title is required"],
  },
  caption: {
    type: String,
    maxlength: 200,
    required: false,
    default:""
  },
  admires: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Number,
  },
  dimmensions: {
    type: [Number],
    minlength: 2, //1080,1920
  },
  size: {
    type: String,
  },
  price: {
    type: Number,
    default:200,
    min: [2, "The price of the poster must be a minimum of 160 Rs"],
    max: [800, "The price of the poster must be below 800 Rs"]
  },
  madeBy: {
    type: String,
  },
  pictureURL: {
    type: String,
  },
  category:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  igLink:{
    type:String,
    default:""
  },
  artistDp:{
    type:String,
    default:""
  },

featured:{
    type:Boolean,
    default:false
},

bestSeller:{
    type:Boolean,
    default:false
},

views:{
  type:Number,
  default:0
},
tags:{
  type:String,
  default:""
}
});

module.exports = mongoose.model("Poster", PosterSchema);
