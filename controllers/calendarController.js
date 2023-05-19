const Date = require('../models/date');
const { sendClientEmail, sendSelfEmail } = require('./emailController');

const getDates = async (req, res) => {
   const query = req.query;
   const date = await Date.find(query);
   res.send(date);
};

const createDates = async (req, res) => {
   try {
      const { dateData, formData } = req.body;
      const { _id, selectedSlot } = dateData;

      const found = await Date.findOne({ _id });

      if (selectedSlot) {
         found.timeSlots.map((slot) =>
            slot._id == selectedSlot._id ? (slot.booked = true) : slot,
         );
         await Date.updateOne({ _id }, found);
         sendClientEmail(dateData, formData, selectedSlot);
         sendSelfEmail(dateData, formData, selectedSlot);
         res.status(202).json(found);
      }
   } catch (error) {
      console.log(error);
   }
};

module.exports = { createDates, getDates };
