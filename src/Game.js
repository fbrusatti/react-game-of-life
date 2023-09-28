import React, { useState, useEffect } from 'react';
import Board from './Board';
import Controls from './Controls';

const BOARD_HEIGHT = 20;
const BOARD_WIDTH = 20;

const calculateNeighbors = (board, x, y) => {
  let neighbors = 0;
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    let y1 = y + dir[0];
    let x1 = x + dir[1];

    if (
      x1 >= 0 &&
      x1 < board[0].length &&
      y1 >= 0 &&
      y1 < board.length &&
      board[y1][x1]
    ) {
      neighbors++;
    }
  }

  return neighbors;
};


export function calculateNewValue(grid, x, y) {
  const neighbors = calculateNeighbors(grid, x, y);
  if (grid[y][x]) {
    return (neighbors === 2 || neighbors === 3);
  } else {
    return (!grid[y][x] && neighbors === 3);
  }
}

export const makeNextBoard = (grid) => {
  return [...Array(grid.length)].map((_, y) =>
    [...Array(grid[0].length)].map((_, x) => {
      return calculateNewValue(grid, x, y);
    }),
  );
}



function Game() {
  const makeEmptyBoard = () => {
    return [...Array(BOARD_HEIGHT)].map((_, rowIndex) =>
      [...Array(BOARD_WIDTH)].map((_, colIndex) => {
        return false;
      }),
    );
  };

  const [grid, setGrid] = useState(makeEmptyBoard);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [delay, setDelay] = useState(100); 

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/games/5');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // debugger;
      setGrid(data.board); // Assuming the response contains the new grid data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (isRunning) {
      const timeoutId = setTimeout(() => {
        const nextBoard = makeNextBoard(grid);
        setGrid(nextBoard);
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [grid, isRunning, delay]);

  const stopSimulation = () => {
    setIsRunning(false);
    if (intervalId) {
      clearTimeout(intervalId);
    }
  };

  return (
    <div>
        <Board
          grid={grid}
          onGridChange={setGrid}
        />
      <Controls
        onStopGame={stopSimulation}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        delay={delay}
        setDelay={setDelay}
      />
    </div>
  )
}

export default Game;
