const mongoose = require("mongoose");

const craftSchema = new mongoose.Schema({
  name: String,
  type: String,
  brand: String,
  price: String,
  age: Number,
  owner_id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("Craft", craftSchema);
