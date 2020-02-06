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
    type: String, //url
    default:
      "https://library.kissclipart.com/20180929/vpq/kissclipart-icon-clipart-computer-icons-business-company-6438dbeb59c64e42.jpg",
    trim: true
  },
  description: {
    type: String,
    default: "Find Cleaner app business",
    trim: true
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
});

const model = mongoose.model("Business", schema);
module.exports = model;
