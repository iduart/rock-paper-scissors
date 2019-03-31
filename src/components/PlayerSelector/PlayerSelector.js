import React, { useState, useRef, useEffect } from 'react';
import useMatchActions from '../../state/actions';
import PlayerSelectorSvg from './PlayerSelectorSvg';
import './PlayerSelector.scss';

const PlayerSelector = props => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const actions = useMatchActions();
  const inputPlayer1 = useRef(null);

  useEffect(() => {
    inputPlayer1.current.focus();
  }, [])

  const onStartMatch = () => {
    if (!player1 || !player2) {
      return;
    }
    const players = [
      {
        name: player1,
        score: 0
      },
      {
        name: player2,
        score: 0
      }
    ];
    actions.setPlayers(players);
    props.history.push('match');
  };

  return (
    <PlayerSelectorSvg onStartMatch={onStartMatch} disabled={!player1 || !player2}>
      <input
        ref={inputPlayer1}
        type='text'
        tabIndex='1'
        className='playerInput'
        onChange={e => setPlayer1(e.target.value)}
      />
      <input
        type='text'
        tabIndex='2'
        className='playerInput'
        onChange={e => setPlayer2(e.target.value)}
      />
    </PlayerSelectorSvg>
  );
};

export default PlayerSelector;
