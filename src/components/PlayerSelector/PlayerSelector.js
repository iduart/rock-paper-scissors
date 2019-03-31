import React, { useState, useRef, useEffect } from 'react';
import useMatchActions from '../../state/actions';
import { useGlobalState } from '../../state';
import PlayerSelectorSvg from './PlayerSelectorSvg';
import './PlayerSelector.scss';

const PlayerSelector = props => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const actions = useMatchActions();
  const [{ players }] = useGlobalState();
  const inputPlayer1 = useRef(null);
  const isInvalid = !player1 || !player2 || player1 === player2;

  useEffect(() => {
    inputPlayer1.current.focus();
    if (players.length && players.length === 2) {
      setPlayer1(players[0].name);
      setPlayer2(players[1].name);
    }
  }, []);

  const onStartMatch = () => {
    actions.setWinner('');
    if (isInvalid) {
      return;
    }
    const players = [
      {
        name: player1,
        score: 0,
        move: 0
      },
      {
        name: player2,
        score: 0,
        move: 0
      }
    ];
    actions.setPlayers(players);
    props.history.push('match');
  };

  return (
    <PlayerSelectorSvg
      onStartMatch={onStartMatch}
      disabled={isInvalid}
    >
      <input
        ref={inputPlayer1}
        type='text'
        tabIndex='1'
        value={player1}
        className='playerInput'
        onChange={e => setPlayer1(e.target.value)}
      />
      <input
        type='text'
        tabIndex='2'
        value={player2}
        className='playerInput'
        onChange={e => setPlayer2(e.target.value)}
      />
    </PlayerSelectorSvg>
  );
};

export default PlayerSelector;
