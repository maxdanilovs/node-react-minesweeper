import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Field = React.memo(({ id, status, flagged }) => {

  const { handleFieldOpening, handleFlag, handleClearance, mines } = useContext(GlobalContext);

  function handleClick(e) {
    e.preventDefault();
    if (status !== 'unopened' || flagged) return;
    handleFieldOpening(id);
  }

  function handleRightClick(e) {
    e.preventDefault();
    if (status !== 'unopened' || (mines === 0 && !flagged)) return;
    handleFlag(id);
  }

  function handleMouseDown(e) {
    e.preventDefault();
    if (status === 'unopened') return;
    if (e.buttons === 4 || e.buttons === 3) {
      handleClearance(id)
    }
  }

  return (
    <React.Fragment>
      <td>
      <span
      className={flagged ? 'flagged' : `mines-${status}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onMouseDown={handleMouseDown}></span>
      </td>
    </React.Fragment>
  )
})

export default Field;
