const mongoose = require("mongoose");

const PasswordReq = new mongoose.Schema({
  email: {
    type: String
  },
  id:{
      type: String
  },
  uid:{
    type:mongoose.Schema.Types.ObjectId
  }
})

module.exports = mongoose.model("PasswordReq", PasswordReq);
