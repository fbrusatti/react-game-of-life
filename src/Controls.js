import React from 'react';

// function Controls({onStopGame, onStartGame, isRunning, setIsRunning, delay, setDelay}){
  function Controls({onStopGame, isRunning, setIsRunning, delay, setDelay}){

  const handleIntervalChange = (event) => {
    const newInterval = parseInt(event.target.value, 10);
    setDelay(newInterval);
  }

  const handleSimulationStart = () => {
    setIsRunning(true);
  }

  const handleSimultaionStop = () => {
    setIsRunning(false);
    onStopGame();
  }

  return(
    <div className="controls">
      Update every <input value={delay} onChange={handleIntervalChange} /> msec
      { isRunning ?
        <button className="button" onClick={handleSimultaionStop}>Stop</button> :
        <button className="button" onClick={handleSimulationStart}>Start</button>
      }
    </div>
  );
}

export default Controls;