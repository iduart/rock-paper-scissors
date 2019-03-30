import React, { useState } from 'react';
import PlayerSelectorSvg from './PlayerSelectorSvg';
import './PlayerSelector.scss';

const PlayerSelector = () => {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const onStartMatch = () => {
    console.log('started');
  };

  return (
    <PlayerSelectorSvg onStartMatch={onStartMatch}>
      <input
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
