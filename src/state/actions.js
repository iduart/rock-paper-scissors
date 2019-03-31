import { useGlobalState } from './index';

const useMatchActions = () => {
  const [state, dispatch] = useGlobalState();

  const setPlayers = players =>
    dispatch({ type: 'SET_PLAYERS', data: players });

  const setTurn = playerName =>
    dispatch({ type: 'SET_TURN', data: playerName });

  const incrementTurnCount = () => dispatch({ type: 'INCREMENT_TURN_COUNT' });

  const setWinner = (winner) => {
    dispatch({ type: 'SET_WINNER', data: winner });
    cleanPlayers();
  } 
  const setNextRound = () => {
    dispatch({ type: 'SET_NEXT_ROUND' });
    //clean moves
    const newPlayers = [...state.players].map(player => ({ ...player, move: 0 }));
    setPlayers(newPlayers);
  };

  const cleanPlayers = () => {
    const newPlayers = [...state.players].map(player => ({ ...player, move: 0, score: 0 }));
    setPlayers(newPlayers);
  }

  return {
    setPlayers,
    setTurn,
    setNextRound,
    incrementTurnCount,
    setWinner,
    cleanPlayers
  };
};

export default useMatchActions;
