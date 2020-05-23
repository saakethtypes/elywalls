const mongoose = require("mongoose");
const Poster = require('./Poster');

const TextographySchema = new mongoose.Schema({
  items: {
    type: [Poster.schema],default:[]
  }
})

module.exports = mongoose.model("Textography", TextographySchema);
