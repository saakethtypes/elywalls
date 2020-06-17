const mongoose = require("mongoose");
const Poster = require('./Poster');

const GraphicSchema = new mongoose.Schema({
  items: {
    type: [Poster.schema],default:[]
  }
})

module.exports = mongoose.model("Graphic", GraphicSchema);
