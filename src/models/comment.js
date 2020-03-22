const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        rate: {
            type: Number,
            default: 2
        },
        comment: {
            type: String,
            default: ""
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client"
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business"
        }
    }
);

const model = mongoose.model("Comment", schema);
module.exports = model;

