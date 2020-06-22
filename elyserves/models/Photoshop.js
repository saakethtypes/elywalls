const mongoose = require("mongoose");
const Poster = require('./Poster');

const PhotoshopSchema = new mongoose.Schema({
  items: {
    type: [Poster.schema],default:[]
  }
})

module.exports = mongoose.model("Photoshop", PhotoshopSchema);
