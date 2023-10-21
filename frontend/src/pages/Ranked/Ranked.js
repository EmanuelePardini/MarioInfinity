import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Ranked.css";

const Ranked = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    axios.get(apiUrl + "/api/ranks")
      .then((response) => {
        setRanks(response.data.top_scores);
        console.log(response.data.top_scores);
      })
      .catch((error) => {
        console.error("Error fetching ranks:", error);
      });
  }, []);

  return (
    <div className="ranked-container">
      <h2>Ranked Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
        {ranks.map((rank, index) => (
            <tr key={rank.id}>
              <td>{index + 1}</td>
              <td>{rank.username}</td>
              <td>{rank.max_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ranked;
