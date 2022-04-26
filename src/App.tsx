import React, { useState, useEffect } from 'react';
import './App.css';

interface Box {
  value: string;
};

const App: React.FC = () => {

  const defaultBoxValues: Box[] = [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' }
  ];

  const [ boxValues, setBoxValues ] = useState<Box[]>(defaultBoxValues);
  const [ activePlayer, setActivePlayer ] = useState<string>('');
  const [ winner, setWinner ] = useState<string>('');
  const [ errorMessage, setErrorMessage ] = useState<string>('');

  useEffect(() => {
    if (errorMessage && activePlayer) {
      setErrorMessage('')
    }
  }, [activePlayer])

  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      let a = boxValues[winCondition[0]];
      let b = boxValues[winCondition[1]];
      let c = boxValues[winCondition[2]];
      if (a.value === '' || b.value === '' || c.value === '') {
          continue;
      }
      if (a.value === b.value && b.value === c.value) {
        setWinner(a.value);
        break;
      }
    }
  }

  const handleClick = (index: number) => {
    if (!activePlayer) {
      return setErrorMessage('You must choose a side first')
    }

    const updatedBoxes: Box[] = [...boxValues];
    updatedBoxes[index].value = activePlayer;
    setBoxValues(updatedBoxes);

    checkWinner();

    if (activePlayer === 'X') {
      setActivePlayer('O');
    } else {
      setActivePlayer('X');
    }
  }

  return (
    <div style={styles.container}>
      <h2>TIC-TAC-TOE</h2>
      {errorMessage &&
        <h3>{errorMessage}</h3>}
      {winner &&
        <h1>{`${winner} WINS!!!!!`}</h1>}
      {!activePlayer && !winner &&
        <div>
          <h4>Select First Player</h4>
          <div style={styles.buttonContainer}>
            <button onClick={() => setActivePlayer('X')} style={styles.button}>X</button>
            <button onClick={() => setActivePlayer('O')} style={styles.button}>O</button>
          </div>           
        </div>}
      {activePlayer && !winner &&
        <div>
          <h4>{`${activePlayer}'s turn!`}</h4>
        </div>}
      <div style={styles.board}>
        {boxValues.map((box: Box, index: number) =>
          <button 
            style={styles.item} 
            key={index} 
            onClick={() => handleClick(index)} 
            disabled={box.value !== ''}
          >
            {box.value}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px 0 100px 0'
  },
  buttonContainer: {
    display: 'flex'
  },
  button: {
    width: '60px',
    padding: '8px',
    margin: '0 8px 20px 8px',
    borderRadius: '3px',
    border: '1px solid gray',
    backgroundColor: '#FFFFFF',
    '&:hover': {
      color: 'pink'
    }
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: '#FFFFFF',
    width: '200px',
    height: '200px',
    border: '1px solid gray',
    fontSize: '48px'
  }
} as const;
