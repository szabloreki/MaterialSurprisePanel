const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: String,
  role: String,
  password: String,
  recoveryKey: String,
  name: String,
  showName: String
})

module.exports = mongoose.model('User', UserSchema)
