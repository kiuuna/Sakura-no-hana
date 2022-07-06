const mongoose = require("mongoose");
const { Schema } = mongoose;

const members = new Schema({
    _id: Schema.Types.ObjectId,
    discord_id: String
}, { timestamps: true });

module.exports = mongoose.model("members", members);