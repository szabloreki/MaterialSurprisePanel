const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
  title: String,
  description: String,
  projectId: String,
  estimate: Number,
  estimateResult: Number,
  responsible: String,
  status: Boolean,
  progress: {type:String, default: "new"},
  categoryId: String,
  hidden: Boolean,
  priority: Number,
  showName: String,
  commends :
  [
    {
      description: String,
      author: String,
      date: Date
    }
  ],
  endDate: Date
});

module.exports = mongoose.model ('Task', TaskSchema);
