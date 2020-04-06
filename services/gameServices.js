const uuid = require('uuid');

// Create new game and board depending on mode
const createGame = (gameMode) => {
    let game = {
        gameId: uuid.v4(),
        startTime: 0,
        recordTime: 0,
        gameStatus: -1,
        boardParams: {}, 
        board: {}
    };

    switch(gameMode) {
        case 'easy':
            return {
                ...game,
                gameStatus: 0,
                boardParams: { rows: 8, cols: 8, mines: 10, gameMode },
                board: createBoard(8, 8, 10)
            }
        case 'pro':
            return {
                ...game,
                gameStatus: 0,
                boardParams: { rows: 16, cols: 16, mines: 40, gameMode },
                board: createBoard(16, 16, 40)
            }
        case 'expert':
            return {
                ...game,
                gameStatus: 0,
                boardParams: { rows: 16, cols: 31, mines: 99, gameMode },
                board: createBoard(16, 31, 99)
            }
        default:
            return game;
    }
}

// clear around if theres no bomb
const clearAroundField = (board, sField) => {
    if (!sField.opened) return;

    sField.checked = true;

    const aroundSelected = fieldsAround(board, sField);
    const mines = aroundSelected.filter(field => field.mine).length;
    const flags = aroundSelected.filter(field => field.flagged).length;

    if (mines !== flags) return;

    board.map(field => {
        if (aroundSelected.some(f => f.id === field.id)) {
          if (!field.flagged) {
            field.opened = true;
          }
          if (field.opened && field.mine) {
              field.minesAround = -2;
          }
        }
        return field;
    });

    aroundSelected.forEach(field => {
        if (!field.checked && field.minesAround === 0) {
            clearAroundField(board, field);
        }
    });
}

function createBoard(rows, cols, mines) {
    let board = [];
    let id = 1;
    let randomNums = [];

    // Generate random field positions to place mines
    for (let i = 1; i <= (rows * cols); i += 1) {
        randomNums.push(i);
    }
    randomNums.sort(() => { return 0.5 - Math.random() }).splice(mines, 10000);

    // Create mine field
    for (let i = 1; i <= rows; i += 1) {
        for (let j = 1; j <= cols; j += 1) {
            board.push({ 
                id,
                row: i, 
                col: j, 
                checked: false,
                mine: randomNums.includes(id) ? true : false,
                minesAround: 0, 
                opened: false, 
                flagged: false 
            });
        id += 1;
        }
    }

    // Count mines around selected field and assign to minesAround
    board.forEach(field => {
        if (field.mine) {
            field.minesAround = -1;
        } else {
            field.minesAround = fieldsAround(board, field).filter(f => f.mine).length;
        }
    })

    return board;
}

// Return fields around selected field in board
function fieldsAround(board, sField) {
    const filteredBoard = board.filter(field => (
        (field.row === sField.row && field.col === sField.col - 1) ||
        (field.row === sField.row && field.col === sField.col + 1) ||
        (field.row === sField.row - 1 && field.col === sField.col) ||
        (field.row === sField.row - 1 && field.col === sField.col + 1) ||
        (field.row === sField.row - 1 && field.col === sField.col - 1) ||
        (field.row === sField.row + 1 && field.col === sField.col) ||
        (field.row === sField.row + 1 && field.col === sField.col + 1) ||
        (field.row === sField.row + 1 && field.col === sField.col - 1)
    ));

    return filteredBoard;
}

// Check if game is over
const checkGameStatus = (board, mines) => {
    let status = 0;
    let fieldsLeft = 0;

    board.forEach(field => {
        if (field.minesAround === -2) {
            status = -1;
        }
        if (!field.opened) {
            fieldsLeft += 1;
        }
    });

    if (fieldsLeft === mines) {
        status = 1;
    }
    
    return status;
}

const gameRecordTime = (startTime) => {
    return ((Date.now() - startTime) / 1000).toFixed(1);
}

module.exports = {
    createGame,
    clearAroundField,
    checkGameStatus,
    gameRecordTime
}