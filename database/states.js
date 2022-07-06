const mongoose = require("mongoose");
const { Schema } = mongoose;

const states = new Schema({
    member: { type: Schema.Types.ObjectId, ref: "members" },
    in_voice: Boolean,
    is_afk: Boolean,
    afk_reason: String
}, { timestamps: true });

module.exports = mongoose.model("states", states);