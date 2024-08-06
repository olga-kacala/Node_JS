import React, { useEffect, useState } from "react";

export const TopResults = () => {
  const [topResults, setTopResults] = useState([]);

  useEffect(() => {
    const fetchTopResults = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/topResults");
        if (!response.ok) {
          throw new Error("Failed to fetch top results");
        }
        const data = await response.json();
        setTopResults(data);
      } catch (error) {
        console.error("Error fetching top results:", error);
      }
    };

    fetchTopResults();
  }, []);

  return (
    <div>
      <h2>Top 10 Results</h2>
      <ul>
        {topResults.map((result, index) => (
          <li key={index}>
            Game ID: {result.gameId}, Total Attack: {result.totalAttack}, Status: {result.status}
          </li>
        ))}
      </ul>
    </div>
  );
};