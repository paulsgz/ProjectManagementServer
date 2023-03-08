if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const Ticket = require('../models/AppSchema')
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

seedDB().then( () =>{
    mongoose.connection.close();
})