import React, { useEffect } from 'react';
import MatchSvg from './MatchSvg';
import { useGlobalState } from '../../state';
import useMatchActions from '../../state/actions';
import { ROCK, SCISSORS, PAPER } from '../../constants';
import './Match.scss';

const Match = ({ history }) => {
  const [
    { players = [], roundCount, turn, turnCount, winner }
  ] = useGlobalState();
  const {
    setTurn,
    setNextRound,
    setPlayers,
    incrementTurnCount,
    setWinner
  } = useMatchActions();

  useEffect(() => {
    if (!players.length) {
      history.push('players');
      return;
    }
  }, []);

  useEffect(() => {
    if (roundCount > 3) {
      getMatchWinner();
    }
  }, [roundCount]);

  useEffect(() => {
    newTurn();
  }, [turnCount]);

  useEffect(() => {
    if (winner) {
      history.push('result');
    }
  }, [winner]);

  const newTurn = () => {
    if (!players.length) {
      return;
    }
    const { name } = players[turnCount];
    setTurn(name);
  };

  const getRoundWinner = () => {
    const player1 = players[0];
    const player2 = players[1];

    if (player1.move === player2.move) {
      return;
    }

    const winningCases = {
      [`${ROCK}${SCISSORS}`]: 1,
      [`${PAPER}${ROCK}`]: 1,
      [`${SCISSORS}${PAPER}`]: 1
    };

    return winningCases[`${player1.move}${player2.move}`] ? player1 : player2;
  };

  const setScore = () => {
    const roundWinnerPlayer = getRoundWinner();
    if (!roundWinnerPlayer) {
      return;
    }
    const newPlayers = [...players];
    const currentPlayer = newPlayers.find(
      p => p.name === roundWinnerPlayer.name
    );
    currentPlayer.score++;
    setPlayers(newPlayers);
  };

  const getMatchWinner = () => {
    const player1 = players[0];
    const player2 = players[1];
    debugger;
    if (player1.score > player2.score) {
      setWinner(player1.name);
    } else if (player2.score > player1.score) {
      setWinner(player2.name);
    } else {
      setWinner(`${player1.name} and ${player2.name}`);
    }
  }

  const onMoveSelection = move => {
    const newPlayers = [...players];
    const currentPlayer = newPlayers.find(p => p.name === turn);
    currentPlayer.move = move;
    setPlayers(newPlayers);

    //if turnCount is zero, we're in first turn of a round
    if (turnCount === 0) {
      incrementTurnCount();
    } else if (turnCount >= 1) {
      //If last turn of a round, get winner, set score and go to next round
      setScore();
      setNextRound();
    }
  };

  return (
    players.length && (
      <MatchSvg
        player1={players[0]}
        player2={players[1]}
        roundCount={roundCount}
        turn={turn}
        onMoveSelection={onMoveSelection}
      />
    )
  );
};

export default Match;
