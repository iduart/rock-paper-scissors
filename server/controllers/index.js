const express = require('express');

const matches = require('./matches');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello I am an API 👋'
  });
});

router.use('/matches', matches);

module.exports = router;
