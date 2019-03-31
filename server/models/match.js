const { Schema, model } = require("mongoose");

const MatchSchema = new Schema({
  createdAt: Date,
  players: Array,
  winner: String
});

module.exports = model("Match", MatchSchema);