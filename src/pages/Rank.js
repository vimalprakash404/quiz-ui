import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { useEffect , useState} from 'react';
import axios from 'axios';
import domain from '../domian';
const RankPage = () => {
  const location = useLocation();
  // const searchParams = new URLSearchParams(location.state);
  const quizId = location.state.quizId
  const [rankList, setRankList] = useState([]);
  console.log("quizid  :"+quizId )
  useEffect(() => {
    const fetchRankList = async () => {
      try {
        const response = await axios.get(`${domain()}/quiz/rankList/`,
        {params: { quizId }}
        );

        if (response.status === 200) {
          setRankList(response.data.rankList);
        } else {
          console.error('Failed to fetch rank list');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (quizId) {
      fetchRankList();
    }
  }, [quizId]);



  // Generate sample data for ranks
  // const generateRandomScore = () => Math.floor(Math.random() * 100) + 1;

  // const ranks = Array.from({ length: 20 }, (_, index) => ({
  //   rank: index + 1,
  //   name: `Person ${index + 1}`,
  //   score: generateRandomScore(),
  // }));




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
          {rankList.map((entry, index) => (
            <tr key={index}>
              <th scope="row">{entry.rank}</th>
              <td>{entry.userId.username}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankPage;
