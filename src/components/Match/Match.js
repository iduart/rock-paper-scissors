import React, { useEffect } from 'react';
import MatchSvg from './MatchSvg';
import { useGlobalState } from '../../state';
import './Match.scss';

const Match = ({ history }) => {
  const [{ players = [] }] = useGlobalState();
  useEffect(() => {
    if (!players.length) {
      history.push('players');
    }
  }, []);
  return (
    players.length && <MatchSvg player1={players[0]} player2={players[1]} />
  );
};

export default Match;
