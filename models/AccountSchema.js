const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccountSchema = new Schema({
    Email: String,
    Password: String,
    Name: String,
    Role: String,
})

module.exports = mongoose.model('Account', AccountSchema);