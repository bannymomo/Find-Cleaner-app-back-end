const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  postcode: {
    type: Number,
    required: true
  },
  telephoneNumber: {
    type: Number,
    required: true
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  lastOnline: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String, //url
    default:
      "https://library.kissclipart.com/20180929/vpq/kissclipart-icon-clipart-computer-icons-business-company-6438dbeb59c64e42.jpg"
  },
  description: {
    type: String,
    default: "Find Cleaner app business"
  }
});

const model = mongoose.model("Business", schema);
module.exports = model;
