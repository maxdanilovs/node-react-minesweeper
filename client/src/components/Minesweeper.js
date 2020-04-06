import React, { useContext } from 'react';
import Field from './Field';
import { GlobalContext } from '../context/GlobalState';

function Minesweeper() {

  const { gameBoard, columns, gameMode } = useContext(GlobalContext);

  function displayBoard(cols) {
    let fields = [];
    const board = [];
    let count = 0;
    gameBoard.forEach(field => {
      fields.push(<Field
          key={field.id}
          id={field.id}
          status={field.status}
          flagged={field.flagged}
        />)
      count += 1;
      if (count === cols) {
        board.push(<tr key={field.id}>{fields}</tr>);
        fields = [];
        count = 0;
      }
    });
    return board;
  }

  return (
    <div>
      <table className={`minesweeper ${gameMode}-size`}>
        <tbody>
          {displayBoard(columns)}
        </tbody>
      </table>
    </div>
  )
}

export default Minesweeper;
