import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  date: new Date(),
  players: [],
  winner: '',
  roundCount: 1,
  turn: '',
  turnCount: 0
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case 'SET_PLAYERS': {
      return {
        ...state,
        players: [...data]
      };
    }
    case 'SET_TURN': {
      return {
        ...state,
        turn: data
      };
    }
    case 'SET_NEXT_ROUND': {
      const { roundCount } = state;
      const nextRound = roundCount > 3 ? roundCount : roundCount + 1;
      return {
        ...state,
        roundCount: nextRound,
        turnCount: 0
      };
    }
    case 'INCREMENT_TURN_COUNT': {
      const { turnCount } = state;
      return {
        ...state,
        turnCount: turnCount + 1
      }
    }
    case 'SET_WINNER': {
      return {
        ...state,
        winner: data,
        roundCount: 1
      }
    }
    default: {
      return state;
    }
  }
};

export const Context = createContext();

export const Provider = ({ children }) => (
  <Context.Provider value={useReducer(reducer, initialState)}>
    {children}
  </Context.Provider>
);

export const useGlobalState = () => useContext(Context);
