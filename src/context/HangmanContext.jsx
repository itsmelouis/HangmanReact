/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { createContext, useReducer, useEffect } from 'react';

export const HangmanContext = createContext();

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const initialState = {
  word: '',
  guessedLetters: [],
  incorrectGuesses: 0,
  maxIncorrectGuesses: 6,
  gameStatus: 'ongoing',
  playerName: '',
};

const hangmanReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORD':
      return { ...state, word: action.payload, loading: false };
    case 'GUESS_LETTER':
      const { guessedLetters, word } = state;
      const letter = action.payload.toLowerCase();
      if (guessedLetters.includes(letter)) return state; // Letter already guessed
      return {
        ...state,
        guessedLetters: [...guessedLetters, letter],
        incorrectGuesses: word.includes(letter) ? state.incorrectGuesses : state.incorrectGuesses + 1,
      };
    case 'RESET':
      return { ...initialState, loading: false };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'WIN':
      return { ...state, gameStatus: 'win' };
    case 'LOSE':
      return { ...state, gameStatus: 'lose' };
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    default:
      return state;
  }
};

export const HangmanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hangmanReducer, initialState);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/nmondon/mots-frequents/master/data/frequence.json');
        if (!response.ok) {
          throw new Error('Failed to fetch word');
        }
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomWord = data[randomIndex].label;
        console.log(randomWord);
        dispatch({ type: 'SET_WORD', payload: randomWord });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    };

    fetchWord();

  }, []);

  useEffect(() => {
    // Check if the game is still ongoing and if the user has made any guesses
    if (state.gameStatus === 'ongoing' && state.guessedLetters.length > 0) {
      const wordWithoutSpaces = state.word.replace(/\s/g, ''); // Remove spaces from the word
      const guessedWord = state.word
        .split('')
        .map(letter => (state.guessedLetters.includes(letter.toLowerCase()) ? letter : '_'))
        .join('')
        .replace(/\s/g, ''); // Remove spaces from the guessed word
      if (guessedWord === wordWithoutSpaces) {
        // User has guessed the word correctly
        dispatch({ type: 'WIN' });
        alert('Congratulations! You win!');
      } else if (state.incorrectGuesses >= state.maxIncorrectGuesses) {
        // User has reached maximum incorrect guesses
        dispatch({ type: 'LOSE' });
        alert(`Game Over! The correct word was: ${state.word}`);
      }
    }
  }, [state.word, state.guessedLetters, state.incorrectGuesses, state.maxIncorrectGuesses, state.gameStatus]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const keyPressed = event.key.toLowerCase();
      if (alphabet.includes(keyPressed) && !state.guessedLetters.includes(keyPressed)) {
        dispatch({ type: 'GUESS_LETTER', payload: keyPressed });
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [state.guessedLetters]);

  const handleLetterClick = (letter) => {
    if (!state.guessedLetters.includes(letter)) {
      dispatch({ type: 'GUESS_LETTER', payload: letter });
    }
  };

  const handleWordGuess = (word) => {
    dispatch({ type: 'GUESS_WORD', payload: word });
  };

  const handlePlayerNameSubmit = (name) => {
    dispatch({ type: 'SET_PLAYER_NAME', payload: name });
  };

  const handleRestartGame = () => {
    dispatch({ type: 'RESET' });
  };

  

  return (
    <HangmanContext.Provider value={{ state, dispatch, handleLetterClick, handleWordGuess, handlePlayerNameSubmit, handleRestartGame }}>
      {children}
    </HangmanContext.Provider>
  );
};


