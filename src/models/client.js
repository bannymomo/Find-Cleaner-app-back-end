const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      min: 10,
      max: 95,
      default: 20
    },
    email: {
      type: String,
      required: true,
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
      default: "http://www.pngmart.com/files/10/User-Account-PNG-Clipart.png"
    },
    description: {
      type: String,
      default: "Find Cleaner app client"
    }
  },
  { toJSON: { virtuals: true }, id: false }
);

schema.virtual("fullname").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const model = mongoose.model("Client", schema);
module.exports = model;
