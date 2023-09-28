import React, { useState } from 'react';
import Cell from './Cell';

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 20;
const CELL_SIZE = 20;

function Board({grid, onGridChange}) {
  const toggleCellLive = (x, y) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === y && colIndex === x) {
          return !cell;
        }
        return cell;
      })
    );

    onGridChange(newGrid);
  };
  return (
      <div
        className="Board"
        style={{
          width: BOARD_WIDTH * 20,
          height: BOARD_HEIGHT * 20,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${colIndex}-${rowIndex}-${JSON.stringify(grid)}`}
              x={colIndex}
              y={rowIndex}
              live={cell}
              onToggleLive={toggleCellLive}
            />
          ))
        )}
      </div>
    );
}

export default Board;