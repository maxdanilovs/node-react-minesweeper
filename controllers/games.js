const { createGame, clearAroundField, 
    checkGameStatus, gameRecordTime } = require('../services/gameServices');

// Global Array to hold games
global.gamesArray = [];

// create route
const startNewGame = (req, res) => {
    const { gameMode } = req.body;
    const { gameId } = req.session;

    // Clean previous game from the Global Array
    if (gameId) {
        gamesArray = gamesArray.filter(game => game.gameId !== gameId);
    }

    // New Game
    const game = createGame(gameMode);

    // Save game ID in session
    req.session.gameId = game.gameId;

    // Add game to the global games array
    gamesArray.push(game);

    // Send data to front
    res.status(200).json({ gameStatus: game.status, boardParams: game.boardParams });
}

// handle_left_click route
const handleLeftClick = (req, res) => {
    const { gameId } = req.session;
    const fieldId = req.body.fieldId;
    
    // Get current game from Global games array
    const curGame = gamesArray.find(game => game.gameId === gameId);
    const curGameId = gamesArray.findIndex(game => game.gameId === gameId);
        
    // return if game over
    if (curGame.gameStatus !== 0) {
        return res.status(404).json({ err: "game over" })
    }
    
    // Start timer on first click
    if (curGame.startTime === 0) {
        curGame.startTime = Date.now();
    }
    
    // get selectedField
    let sField = {};
    for (let field of curGame.board) {
        if (field.id === fieldId) {
            field.opened = true;
            sField = field;
            break;
        }
    };
    
    // If no mines around clear fields
    if (sField.minesAround === 0) {
        clearAroundField(curGame.board, sField);
    }
    
    // If field was mined
    if (sField.mine) {
        curGame.gameStatus = -1;
    } else {
        curGame.gameStatus = checkGameStatus(curGame.board, curGame.boardParams.mines);
    }

    // Response
    if (curGame.gameStatus === -1) {
        res.json({ gameStatus: curGame.gameStatus, board: curGame.board });    
    } else if (curGame.gameStatus === 1) {
        curGame.recordTime = gameRecordTime(curGame.startTime);
        res.json({ gameStatus: curGame.gameStatus, board: curGame.board, recordTime: curGame.recordTime });
    } else {
        const openedFields = curGame.board.filter(field => field.opened);
        res.json({ gameStatus: curGame.gameStatus, board: openedFields });
    }

    // save changes in current game
    gamesArray[curGameId] = curGame;
}

// handle_clearance route
const handleClearance = (req, res) => {
    const { gameId } = req.session;
    const fieldId = req.body.fieldId;
    // Get current game from Global games array
    const curGame = gamesArray.find(game => game.gameId === gameId);
    const curGameId = gamesArray.findIndex(game => game.gameId === gameId);
        
    // return if game over
    if (curGame.gameStatus !== 0) {
        return res.status(404).json({ msg: "game over" })
    }

    const sField = curGame.board.find(field => field.id === fieldId);

    clearAroundField(curGame.board, sField);
    
    // Check win or lost
    curGame.gameStatus = checkGameStatus(curGame.board, curGame.boardParams.mines);
    
    // response
    if (curGame.gameStatus === -1) {
        res.json({ gameStatus: curGame.gameStatus, board: curGame.board });    
    } else if (curGame.gameStatus === 1) {
        curGame.recordTime = gameRecordTime(curGame.startTime);
        res.json({ gameStatus: curGame.gameStatus, board: curGame.board, recordTime: curGame.recordTime });
    } else {
        const openedFields = curGame.board.filter(field => field.opened);
        res.json({ gameStatus: curGame.gameStatus, board: openedFields });
    }
    
    // save changes in current game
    gamesArray[curGameId] = curGame;
}

// handle_right_click route
const handleFlagPlacement = (req, res) => {
    const { gameId } = req.session;
    const fieldId = req.body.fieldId;
    let flagged = null;

    // Get current game from Global games array
    const { board } = gamesArray.find(game => game.gameId === gameId);

    // Set flagged on selected field
    for (let field of board) {
        if (field.id === fieldId && !field.opened) {
            field.flagged = !field.flagged;
            flagged = field.flagged;
            break;
        }
    };

    res.json({ fieldId, flagged })
}


module.exports = {
    startNewGame,
    handleLeftClick,
    handleFlagPlacement,
    handleClearance
}