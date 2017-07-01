const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema ({
    name: String,
    file: String,
    projectId: String
})
module.exports = mongoose.model ('Files', FileSchema);
