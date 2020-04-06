const Record = require('../models/Record');

const addRecordToDb = (req, res) => {
    const { name } = req.body;
    const { gameId } = req.session;
    let { gameStatus, boardParams, recordTime } = gamesArray.find(game => game.gameId === gameId);

    if (gameStatus === 1) {
        const newRecord = new Record({
            name,
            gameMode: boardParams.gameMode,
            recordTime
        });

        newRecord.save((err) => {
            if (err) res.status(404).json({ msg: err });
            res.json({ newRecord });
        })
    }
}

const getRecords = (req, res) => {
    const { gameMode } = req.body;

    Record.find({ gameMode: gameMode })
    .sort({ recordTime: 1 })
    .limit(10)
    .exec((err, records) => {
        if (err) res.status(404).json({ msg: err });
        res.json({ records });
    });
}

module.exports = {
    addRecordToDb,
    getRecords
}