/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { createContext, useReducer, useEffect } from 'react';

export const HangmanContext = createContext();

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const initialState = {
  word: '',
  guessedLetters: [],
  loading: true,
  error: null,
  incorrectGuesses: 0,
  maxIncorrectGuesses: 6,
  gameStatus: 'ongoing',
  playerName: '',
  score: localStorage.getItem('score') || 0,
};

const hangmanReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORD':
      return { ...state, word: action.payload, loading: false };
    case 'GUESS_LETTER':
      const { guessedLetters, word } = state;
      const letter = action.payload.toLowerCase();
      if (guessedLetters.includes(letter)) return state;
      return {
        ...state,
        guessedLetters: [...guessedLetters, letter],
        incorrectGuesses: word.includes(letter) ? state.incorrectGuesses : state.incorrectGuesses + 1,
      };
    case 'RESET':
      return { ...state, word: '', guessedLetters: [], error: null, incorrectGuesses: 0, loading: false, gameStatus: 'ongoing' };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'WIN': // return the state with the score update from the payload
      return { ...state, gameStatus: 'win', score: parseInt(state.score, 10) + action.payload };
      
    case 'LOSE':
      return { ...state, gameStatus: 'lose' };
    case 'INCORRECT_GUESS':
      return { ...state, incorrectGuesses: state.incorrectGuesses >= state.maxIncorrectGuesses ? state.incorrectGuesses : state.incorrectGuesses + 1 };
    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.payload };
    default:
      return state;
  }
};

export const HangmanProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hangmanReducer, initialState);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        return;
      }

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


