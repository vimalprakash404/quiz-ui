import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
const RankPage = () => {
  // Generate sample data for ranks
  const generateRandomScore = () => Math.floor(Math.random() * 100) + 1;

  const ranks = Array.from({ length: 20 }, (_, index) => ({
    rank: index + 1,
    name: `Person ${index + 1}`,
    score: generateRandomScore(),
  }));

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Leaderboard</h1>
        <Link to="/menu" className="btn btn-primary">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
        </Link>
      </div>
      <hr/>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((entry, index) => (
            <tr key={index}>
              <th scope="row">{entry.rank}</th>
              <td>{entry.name}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankPage;
