import React, { useState, useEffect } from 'react';
import { getStatistics } from '../../api/match';
import './Statistics.scss';

const Statistics = () => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    getMatchsStatistics();
  }, []);

  const getMatchsStatistics = async () => {
    const response = await getStatistics();
    setResults(response.data);
  };

  const renderResults = () => {
    return results.map(r => <li>{`${r._id} - ${r.count} 👑`}</li>);
  };
  return (
    <div className='statisticsPage'>
      <div className='title'>Statistics</div>
      <ul>{renderResults()}</ul>
    </div>
  );
};

export default Statistics;
