const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: "new",
    enum: [
      "new",
      "cancelledByClient",
      "accepted",
      "cancelledByBusiness",
      "done"
    ]
  },
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

  dueDate: {
    type: Date,
    default: Date.now
  },

  description: {
    type: String,
    default: "Details",
    trim: true
  },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },

  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" }
});

const model = mongoose.model("Order", schema);
module.exports = model;
