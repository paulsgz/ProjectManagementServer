if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const {Ticket} = require('../models/AppSchema');
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
        "Security vulnerability found",
        "Database connection issue",
        "Incorrect user input",
        "Authorization error",
        "Compatibility issue",
        "API endpoint not responding",
        "Network connectivity issue",
        "File upload problem",
        "Email service not working",
        "Server configuration issue",
        "Third-party service integration problem",
        "User interface not functioning",
        "Mobile app crashing",
        "Page layout issue",
        "Database performance issue",
        "Code syntax error",
        "Memory leak problem",
        "DNS resolution issue",
        "Backup and recovery problem",
        "Browser compatibility issue",
        "404 error",
        "500 error",
        "502 error",
        "503 error",
        "504 error"
    ];
    const priorities = ['Critical', 'High', 'Medium', 'Low'];
    const statuses = ['To do', 'In progress', 'In review', 'Finished'];
    const todoCount = 7;
    const inProgressCount = 4;
    const inReviewCount = 5;
    const finishedCount = 3;
    let statusIndex = 0;
    const developers = ["Paul", "John", "Jane", "Bob", "Alice", "Tom"];
    let developerIndex = 0;
    const today = new Date();
    for(let i = 0; i < todoCount + inProgressCount + inReviewCount + finishedCount; i++){
        const status = statuses[statusIndex];
        const date = new Date(today.getTime() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)); // Generate random date within past month
        const ticket = new Ticket({
            Description: descriptions[i],
            Developer:  developers[developerIndex],
            Priority: priorities[Math.floor(Math.random() * priorities.length)],
            Status: status,
            Date: date.toLocaleDateString() // Store date as ISO string
        });
        await ticket.save();
        console.log(ticket);
        developerIndex = (developerIndex + 1) % developers.length;
        
        if (statusIndex === 0 && i >= todoCount) {
            statusIndex++;
        } else if (statusIndex === 1 && i >= todoCount + inProgressCount) {
            statusIndex++;
        } else if (statusIndex === 2 && i >= todoCount + inProgressCount + inReviewCount) {
            statusIndex++;
        }
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