const express = require('express');
const app = express();
const mongoose = require('mongoose');
const tickets = require('./routes/ticket.js')
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/', tickets);

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,   
}))

const port = process.env.PORT || 5000;
app.listen(port, (req,res) => {
    console.log(`Server running on port ${port}`)
})