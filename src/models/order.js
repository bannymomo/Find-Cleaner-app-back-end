const mongoose = require("mongoose");
const {
  NEW_ORDER,
  CANCELLED_BY_CLIENT,
  ACCEPTED,
  CANCELLED_BY_BUSINESS,
  DONE
} = require("../utils/variables");

const schema = new mongoose.Schema(
  {
    status: {
      type: String,
      // required: true,
      default: NEW_ORDER,
      enum: [
        NEW_ORDER,
        CANCELLED_BY_CLIENT,
        ACCEPTED,
        CANCELLED_BY_BUSINESS,
        DONE
      ]
    },
    bedrooms: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3, 4, 5]
    },
    bathrooms: {
      type: Number,
      required: true,
      enum: [0, 1, 2, 3]
    },
    endOfLease: {
      type: Boolean,
      default: 0
    },
    oven: {
      type: Boolean,
      default: 0
    },
    windows: {
      type: Boolean,
      default: 0
    },
    cabinets: {
      type: Boolean,
      default: 0
    },
    carpet: {
      type: Boolean,
      default: 0
    },
    postDate: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date,
      default: Date(Date.now() + 604800000),
      required: true
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

    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client"
    },

    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    comment: {
      type: Object,
      default: { comment: "", rate: 2 }
    }
  },
  { toJSON: { virtuals: true }, id: false }
);

schema.virtual("price").get(function() {
  return (
    this.bedrooms * 22 +
    this.bathrooms * 28 +
    this.endOfLease * 135 +
    this.oven * 5 +
    this.windows * 68 +
    this.cabinets * 36 +
    this.carpet * 58
  );
});

const model = mongoose.model("Order", schema);
module.exports = model;
