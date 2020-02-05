const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  postBy: {
    type: String,
    required: true,
    trim: true
  },

  postDate: {
    type: Date,
    default: Date.now
  },

  location: {
    type: String,
    required: true,
    trim: true
  },

  budget: {
    type: Number,
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
    default: "Details",
    trim: true
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
    default: "",
    trim: true
  }
});

const model = mongoose.model("Order", schema);
module.exports = model;
