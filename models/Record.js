const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    name: { type: String, required: true },
    gameMode: { type: String, required: true },
    recordTime: { type: Number, required: true }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;