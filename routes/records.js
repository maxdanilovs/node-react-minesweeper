const router = require('express').Router();
const { addRecordToDb, getRecords } = require('../controllers/records');

// Add record to DB
// @post name
router.post('/create', addRecordToDb);

// Return record list
// @post game mode
router.post('/', getRecords);


module.exports = router;