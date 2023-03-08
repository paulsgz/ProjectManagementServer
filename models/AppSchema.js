const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TicketSchema = new Schema({
    Description: String,
    Developer: String,
    Priority: String,
})

module.exports = mongoose.model('Ticket', TicketSchema);