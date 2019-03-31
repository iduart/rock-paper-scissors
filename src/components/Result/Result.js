import React, { useEffect } from 'react';
import ResultSvg from './ResultSvg';
import { useGlobalState } from '../../state';
import './Result.scss';

const Result = ({ history }) => {
  const [{ winner }] = useGlobalState();

  useEffect(() => {
    if (!winner) {
      history.push('/');
    }
  }, [])

  return winner && <ResultSvg winner={winner} />;
};

export default Result;
