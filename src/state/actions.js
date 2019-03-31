import { useGlobalState } from './index';

const useMatchActions = () => {
  const [state, dispatch] = useGlobalState();

  const setPlayers = (players) => {
    dispatch({ type: "SET_PLAYERS", data: players });
  }

  return {
    setPlayers
  };
}

export default useMatchActions;