const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  postBy: {
    type: String,
    required: true
  },

  postDate: {
    type: Date,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  dueDate: {
    type: Date,
    default: Date.now
  },

  description: {
    type: String,
    default: "Details"
  },

  orderConfirmed: {
    type: Boolean,
    default: false
  },

  projectCompleted: {
    type: Boolean,
    default: false
  },

  orderEvaluation: {
    type: String,
    default: ""
  }
});

const model = mongoose.model("Order", schema);
module.exports = model;
