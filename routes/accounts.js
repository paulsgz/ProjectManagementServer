if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const Account = require('../models/AccountSchema')
const cors = require('cors');

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
    const account = new Account({
      Email: req.body.email,
      Password: req.body.password,
      Name: req.body.name,
      Role: req.body.role
    });
      
    try {
      await account.save();
      res.json(account);
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