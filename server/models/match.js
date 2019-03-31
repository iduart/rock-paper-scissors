const { Schema, model } = require("mongoose");

const MatchSchema = new Schema({
  createdAt: Date,
  players: Array,
  winner: {
    type: String,
    required: true
  }
});

module.exports = model("Match", MatchSchema);