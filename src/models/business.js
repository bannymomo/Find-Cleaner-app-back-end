const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: email =>
        !Joi.string()
          .email()
          .validate(email).error,
      msg: "Invalide email format"
    }
  },
  postcode: {
    type: Number,
    required: true
  },
  telephoneNumber: {
    type: Number,
    required: true
  },
  ABNNumber: {
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
    type: String, 
    default:
      "https://cdn.dribbble.com/users/374864/screenshots/1812257/business-avatar.png",
  },
  description: {
    type: String,
    default: "Find Cleaner app business",
    trim: true
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const model = mongoose.model("Business", schema);
module.exports = model;
