const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    gender: {
      type: String,
      trim: true
    },
    age: {
      type: Number,
      min: 10,
      max: 95,
      // default: 20
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
        msg: "Invalid email format"
      }
    },
    postcode: {
      type: Number,
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
      default: "http://www.pngmart.com/files/10/User-Account-PNG-Clipart.png",
      // validate: {
      //   validator: url => 
      //     !Joi.validate(url, Joi.string().uri())
      //     .error,
      //   msg: "Invalid url fomat"
      // }
    },
    description: {
      type: String,
      default: "Find Cleaner app client",
      trim: true
    },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { toJSON: { virtuals: true }, id: false }
);

schema.virtual("fullname").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

const model = mongoose.model("Client", schema);
module.exports = model;
