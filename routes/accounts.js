if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const Account = require('../models/AccountSchema')
const cors = require('cors');
const bcrypt = require('bcrypt');

router.use(cors());
router.get('/accounts', async (req, res) => {
    try {
      const accounts = await Account.find({});
      res.json(accounts);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/createAccounts', cors(), async (req,res) => {
    const { email, password, name, role } = req.body;
  
    try {
      // Generate salt for hashing
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new account with the hashed password
      const account = new Account({
        Email: email,
        Password: hashedPassword,
        Name: name,
        Role: role
      });
  
      // Save the account to the database
      await account.save();
  
      // Return the saved account
      res.json(account);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user with given email exists
      const user = await Account.findOne({ Email: email });
      console.log(user);
      if (!user) {
        return res.status(401).send('Invalid email or password');
      }
  
      // Compare password hashes
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).send('Invalid email or password');
      }
  
      // Return success message and user data
      res.json({ message: 'Login successful', user });
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });


router.delete('/:id', async(req,res) => {
  const { id }  = req.params;
  await Account.findByIdAndDelete(id);
  res.send('Account deleted successfully');
});

module.exports = router;