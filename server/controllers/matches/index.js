const express = require('express');
const getStatistics = require('./getStatistics');
const saveMatch = require('./saveMatch');

const router = express.Router();

router.get('/statistics', getStatistics);
router.post('/', saveMatch);

module.exports = router;
