if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const router = express.Router();
const {Ticket }= require('../models/AppSchema');
const cors = require('cors');

router.use(cors());
router.get('/', async (req, res) => {
    try {
      const tickets = await Ticket.find({});
      res.json(tickets);
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/create', cors(),async (req,res) => {
    const ticket = new Ticket({
        Description: req.body.description,
        Developer: req.body.developer,
        Priority: req.body.priority,
        Status: req.body.status,
        Date: req.body.date,
        Project:req.body.project
    })
    console.log(ticket);
    await ticket.save();
})

router.delete('/:id',async(req,res) => {
  const { id }  = req.params;
  await Ticket.findByIdAndDelete(id);
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).send('Ticket not found');
    }
    ticket.Description = req.body.description || ticket.Description;
    ticket.Developer = req.body.developer || ticket.Developer;
    ticket.Priority = req.body.priority || ticket.Priority;
    ticket.Status = req.body.status || ticket.Status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;