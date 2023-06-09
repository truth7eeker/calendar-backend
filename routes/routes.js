const express = require('express');
const { createDates, getDates } = require('../controllers/calendarController');
const router = express.Router();

router.get('/', getDates);

router.post('/book-date', createDates);

module.exports = router;
