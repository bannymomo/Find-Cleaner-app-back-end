const mongoose = require("mongoose");
const {
  newOrder,
  cancelledByClient,
  accepted,
  cancelledByBusiness,
  done
} = require("../utils/variables");

const schema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: newOrder,
      enum: [newOrder, cancelledByClient, accepted, cancelledByBusiness, done]
    },
    bedrooms: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5]
    },
    bathrooms: {
      type: Number,
      required: true,
      enum: [1, 2, 3]
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

    description: {
      type: String,
      default: "Details",
      trim: true
    },

    orderEvaluation: {
      type: String,
      default: "",
      trim: true
    },

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
    },

    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" }
  },
  { toJSON: { virtuals: true }, id: false }
);

schema.virtual("price").get(function() {
  return this.bedrooms * 25 + this.bathrooms * 35;
});

const model = mongoose.model("Order", schema);
module.exports = model;
