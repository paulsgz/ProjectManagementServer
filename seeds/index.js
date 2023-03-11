if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const Ticket = require('../models/AppSchema');
const Account = require('../models/AccountSchema');
const bcrypt = require('bcrypt');

const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
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
    const descriptions = [
        "Server is down",
        "Payment gateway is not working",
        "Images are not loading",
        "Invalid data validation error",
        "Performance is slow",
        "Security vulnerability found"
    ];
    const priorities = ['Critical', 'High', 'Medium', 'Low'];
    const statuses = ['To do', 'In progress', 'In review', 'Finished'];
    for(let i = 0; i < 10; i++){
        const ticket = new Ticket({
            Description: descriptions[Math.floor(Math.random() * descriptions.length)],
            Developer: "Paul",
            Priority: priorities[Math.floor(Math.random() * priorities.length)],
            Status: statuses[Math.floor(Math.random() * statuses.length)],
        });
        await ticket.save();
        console.log(ticket);
    }
}

const seed2DB = async() => {
    await Account.deleteMany();
    const roles = ["team leader", "Developer"];
    const users = [
        {name: "John Doe", email: "johndoe@example.com", password: "johndoe"},
        {name: "Jane Doe", email: "janedoe@example.com", password: "janedoe"},
        {name: "Bob Smith", email: "bobsmith@example.com", password: "bobsmith"},
        {name: "Alice Johnson", email: "alicejohnson@example.com", password: "alicejohnson"},
        {name: "Tom Williams", email: "tomwilliams@example.com", password: "tomwilliams"},
    ];
    const hashedPassword = await bcrypt.hash("teamleader", 10);
    const teamLeader = new Account({
        Email: 'teamleader@example.com',
        Password: hashedPassword,
        Name: 'Team Leader',
        Role: 'team leader'
    });
    await teamLeader.save();
    console.log(teamLeader);
    for(let i = 0; i < users.length; i++){
        const {name, email, password} = users[i];
        const hashedPassword = await bcrypt.hash(password, 10);
        const account = new Account({
            Email: email,
            Password: hashedPassword,
            Name: name,
            Role: roles[Math.floor(Math.random() * roles.length)]
        });
        await account.save();
        console.log(account);
    }
}

seedDB().then(() => {
    console.log("Tickets seeded successfully");
}).catch((err) => {
    console.error(err);
});

seed2DB().then(() => {
    console.log("Accounts seeded successfully");
}).catch((err) => {
    console.error(err);
})