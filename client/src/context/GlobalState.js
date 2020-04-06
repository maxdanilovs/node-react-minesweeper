import React, { useEffect, createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import Axios from 'axios';

//initial state
const initialState = {
  gameBoard: [],
  recordList: [],
  columns: 0,
  mines: 0,
  time: 0,
  gameMode: 'easy',
  gameStatus: 'stopped'
}

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    startNewGame('easy');
  }, [])

  //actions
  function handleFieldOpening(id) {
    Axios.post('/games/handle_left_click', { fieldId: id })
    .then(res => {
      const { gameStatus, board, recordTime } = res.data;
      if (gameStatus === -1) {
        dispatch({
          type: 'LOST_GAME',
          payload: board
        })
      } else if (gameStatus === 1) {
        dispatch({
          type: 'WON_GAME',
          payload: recordTime
        })
      } else {
        dispatch({
          type: 'OPEN_FIELD',
          payload: board
        })
      }
    })
    .catch(err => console.log(err));
  }

  function handleClearance(id) {
    Axios.post('/games/handle_clearance', { fieldId: id })
    .then(res => {
      const { gameStatus, board, recordTime } = res.data;
      if (gameStatus === -1) {
        dispatch({
          type: 'LOST_GAME',
          payload: board
        })
      } else if (gameStatus === 1) {
        dispatch({
          type: 'WON_GAME',
          payload: recordTime
        })
      } else {
        dispatch({
          type: 'OPEN_FIELD',
          payload: board
        })
      }
    })
    .catch(err => console.log(err));
  }

  function handleFlag(id) {
    Axios.post('/games/handle_right_click', { fieldId: id })
    .then(res => {
      dispatch({
        type: 'PLACE_FLAG',
        payload: { fieldId: res.data.fieldId, flagged: res.data.flagged }
      });
    })
    .catch(err => console.log(err));
  }

  function startNewGame(gameMode = state.gameMode) {
    Axios.all([
      Axios.post('/games/new_game', { gameMode }),
      Axios.post('/records/', { gameMode })
    ])
    .then(res => {
      dispatch({
        type: 'NEW_GAME',
        payload: res[0].data.boardParams
      });
      dispatch(
      {
        type: 'DISPLAY_RECORDS',
        payload: res[1].data.records
      })
    })
    .catch(err => console.log(err));
  }

  return (
    <GlobalContext.Provider value={{
      gameBoard: state.gameBoard,
      columns: state.columns,
      mines: state.mines,
      gameStatus: state.gameStatus,
      time: state.time,
      recordList: state.recordList,
      gameMode: state.gameMode,
      handleFieldOpening,
      handleFlag,
      handleClearance,
      startNewGame
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
