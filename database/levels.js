const mongoose = require("mongoose");
const { Schema } = mongoose;

const levels = new Schema({
    member: { type: Schema.Types.ObjectId, ref: "members" },
    level: Number,
    experience: Number,
    required: Number
}, { timestamps: true });

module.exports = mongoose.model("levels", levels);