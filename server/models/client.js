const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema ({
  name: String,
  details: String,
  responsible: Number,
  key: Number
});

module.exports = mongoose.model ('Client', ClientSchema);
