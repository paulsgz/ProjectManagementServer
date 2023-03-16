const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,

  });

const TicketSchema = new Schema({
    Description: String,
    Developer: String,
    Priority: String,
    Status: String,
    Date: String,
    Project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
})

module.exports = {
    Ticket: mongoose.model('Ticket', TicketSchema),
    Project: mongoose.model('Project', ProjectSchema),
  };