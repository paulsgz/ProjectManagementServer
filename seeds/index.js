if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const Ticket = require('../models/AppSchema')
const Account = require('../models/AccountSchema')
const axios = require('axios')

const MONGO_URL=process.env.MONGO_URL;
mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  
const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const seedDB = async() => {
    await Ticket.deleteMany();
    for(let i=0;i<5;i++){
        const ticket = new Ticket({
            Description: 'Hello World',
            Developer: "Paul",
            Priority: 'Critical',
        })
        await ticket.save();
        console.log(ticket);
    }
}



const seed2DB = async() => {
    await Account.deleteMany();
    for(let i=0;i<5;i++){
        const account = new Account({
            Email: 'christian.seguiza@yahoo.com',
            Password: "Paul",
            Name: 'Paul Seguiza',
            Role: 'Developer'
        })
        await account.save();
        console.log(account);
    }
}

seedDB().then( () =>{
    mongoose.connection.close();
}).catch((err) => {
    console.error(err);
});

seed2DB().then( () =>{
    mongoose.connection.close();
}).catch((err) => {
    console.error(err);
});