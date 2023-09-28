import React, { useState } from 'react';

const CELL_SIZE = 20;

// function Cell({x, y, healthy}) {
//   const [live, setLive] = useState(healthy);

//   return (
//     <div className={`Cell ${live ? 'live' : 'death'}`} style={{
//       left: `${CELL_SIZE * x + 1}px`,
//       top: `${CELL_SIZE * y + 1}px`,
//       width: `${CELL_SIZE - 1}px`,
//       height: `${CELL_SIZE - 1}px`,
//     }} />
//   )
// }
function Cell({ x, y, live, onToggleLive }) {
  const handleClick = () => {
    onToggleLive(x, y);
  };

  return (
    <div
      key={`${x}-${y}`}
      className={`Cell ${live ? 'live' : 'death'}`}
      style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`,
      }}
      onClick={handleClick}
    />
  );
}


export default Cell;