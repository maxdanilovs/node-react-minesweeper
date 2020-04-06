export default (state, action) => {
  switch(action.type) {
    case 'NEW_GAME':
      gameContainerSize(action.payload.gameMode);
      return {
        ...state,
        columns: action.payload.cols,
        mines: action.payload.mines,
        gameMode: action.payload.gameMode,
        gameStatus: 'stopped',
        gameBoard: createBoard(action.payload.rows, action.payload.cols)
      }
    case 'DISPLAY_RECORDS':
      return {
        ...state,
        recordList: action.payload
      }
    case 'OPEN_FIELD':
      return {
        ...state,
        gameStatus: state.gameStatus === 'stopped' ? 'gameon' : state.gameStatus,
        gameBoard: openFields(state.gameBoard, action.payload)
      }
    case 'PLACE_FLAG':
      const { fieldId, flagged } = action.payload;
      const { board, mine } = placeFlag(state.gameBoard, fieldId, flagged);
      return {
        ...state,
        mines: state.mines + mine,
        gameBoard: board
      }
    case 'LOST_GAME':
      return {
        ...state,
        gameStatus: 'lost',
        gameBoard: openAllFields(state.gameBoard, action.payload)
      }
    case 'WON_GAME':
      return {
        ...state,
        gameStatus: 'won',
        time: action.payload
      }
    default:
      return state;
  }
}

function openFields(board, openedFields) {
  const newBoard = [...board];

  newBoard.forEach(field => {
    openedFields.forEach(oField => {
      if (field.id === oField.id) {
        field.status = oField.minesAround;
      }
    })
  })
  return newBoard;
}

function openAllFields(board, openedFields) {
  const newBoard = [...board];

    newBoard.forEach(field => {
      openedFields.forEach(dataField => {
        if (field.id === dataField.id) {
          field.status = dataField.minesAround
          if (dataField.mine) {
            field.status = "mine"
          }
          if (dataField.opened && dataField.mine) {
            field.status += " red"
          }
        }
      })
    })
    return newBoard;
}

function placeFlag(board, id, flagged) {
  const newBoard = [...board];
  let mine = 1;

  for (let field of newBoard) {
    if (field.id === id) {
      field.flagged = flagged;
      if (field.flagged) mine = -1;
      break;
    }
  }
  return { board: newBoard, mine: mine };
}

function createBoard(row, col) {
  const board = [];

  for (let i = 1; i <= (row*col); i++) {
    board.push({
      id: i,
      status: 'unopened',
      flagged: false
    })
  }
  return board;
}

function gameContainerSize(mode) {
  const container = document.getElementById('game-container');
  container.removeAttribute('class');
  container.classList.add(`${mode}-container`);
}
