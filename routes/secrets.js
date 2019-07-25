require('dotenv').config();
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: process.env.NOT_A_SECRET });
});

module.exports = router;
