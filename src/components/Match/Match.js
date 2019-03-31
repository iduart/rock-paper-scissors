import React, { useEffect } from 'react';
import MatchSvg from './MatchSvg';
import { useGlobalState } from '../../state';
import useMatchActions from '../../state/actions';
import { ROCK, SCISSORS, PAPER } from '../../constants';
import { save as saveMatch } from '../../api/match';
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

  const player1 = players[0];
  const player2 = players[1];

  const player1Score = player1 ? player1.score : 0;
  const player2Score = player2 ? player2.score : 0;

  useEffect(() => {
    if (!players.length) {
      history.push('players');
    }
  }, []);

  useEffect(() => {
    if (player1Score >= 3 || player2Score >= 3) {
      getMatchWinner();
    }
  }, [player1Score, player2Score]);

  useEffect(() => {
    newTurn();
  }, [turnCount]);

  useEffect(() => {
    if (winner) {
      saveMatchResults();
      history.push('result');
    }
  }, [winner]);

  const saveMatchResults = async () => {
    const data = {
      players,
      winner
    };
    await saveMatch(data);
  }

  const newTurn = () => {
    if (!players.length) {
      return;
    }
    const { name } = players[turnCount];
    setTurn(name);
  };

  const getRoundWinner = () => {
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
    if (player1.score > player2.score) {
      setWinner(player1.name);
    } else if (player2.score > player1.score) {
      setWinner(player2.name);
    } 
  };

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
