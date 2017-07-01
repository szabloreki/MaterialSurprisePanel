const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  active: {type: Boolean, default: true},
  name: String,
  client: String,
  status: String,
  details: String,
  mindMap: String,
  users: [
    {
      userId: String
    }
  ],
  key: Number,
  endDate: Date,
  closeProjectDate: Date,
  finances: {
    all: Number,
    frontEnd: Number,
    backEnd: Number,
    hosting: Number,
    graphic: Number,
    frontEndAdmin: Number,
    frontEndHtml: Number
  },
  files:
  [
    {
      file: String,
      name: String
    }
  ],
  brief: [
    {
      name: String,
      description: String
    }
  ],
  contacts:
  [
    {
      date: Date,
      title: String,
      description: String,
      commends:
      [
      {
        title: String,
        description: String,
        date: Date
      }
      ]
    }
  ]
})

module.exports = mongoose.model ('Project', ProjectSchema);
