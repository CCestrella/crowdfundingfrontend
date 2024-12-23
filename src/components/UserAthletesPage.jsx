import React, { useEffect, useState } from 'react';

const UserAthletesPage = () => {
  const [athletes, setAthletes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAthletes = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_API_URL}/my-athletes/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch athletes');
        const data = await response.json();
        setAthletes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserAthletes();
  }, []);

  if (error) return <h2>{error}</h2>;
  if (athletes.length === 0) return <h2>No athletes found</h2>;

  return (
    <div>
      <h1>Your Athletes</h1>
      <ul>
        {athletes.map((athlete) => (
          <li key={athlete.id}>
            {athlete.first_name} {athlete.last_name} - {athlete.sport}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAthletesPage;
