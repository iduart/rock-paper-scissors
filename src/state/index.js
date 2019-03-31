import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  date: new Date(),
  players: [],
  winner: '',
  round: 1,
  turn: ''
};

const reducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case 'SET_PLAYERS': {
      return {
        players: [...data]
      };
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
