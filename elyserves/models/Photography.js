const mongoose = require("mongoose");
const Poster = require('./Poster');

const PhotographySchema = new mongoose.Schema({
  items: {
    type: [Poster.schema],default:[]
  }
})

module.exports = mongoose.model("Photography", PhotographySchema);
