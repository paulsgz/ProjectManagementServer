const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    Name: String,
})

module.exports = mongoose.model('Project', ProjectSchema);

