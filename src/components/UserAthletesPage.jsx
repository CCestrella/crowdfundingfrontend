import './UserAthletesPage.css';
import React, { useEffect, useState } from 'react';

const UserAthletesPage = () => {
  const [athletes, setAthletes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAthletes = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/my-athletes/`, {
          headers: {
            Authorization: `Token ${token}`,
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

  const handleEditProgress = (athlete) => {
    const newProgress = prompt(
      `Edit progress for ${athlete.first_name} ${athlete.last_name}`,
      athlete.progress || ''
    );
    if (newProgress) {
      const updatedAthletes = athletes.map((a) =>
        a.id === athlete.id ? { ...a, progress: newProgress } : a
      );
      setAthletes(updatedAthletes);

      // Update backend (example API request)
      fetch(`${import.meta.env.VITE_API_URL}/api/my-athletes/${athlete.id}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...athlete, progress: newProgress }),
      }).catch((err) => console.error('Failed to update athlete progress:', err));
    }
  };

  const handleToggleFilled = (athlete) => {
    const updatedAthletes = athletes.map((a) =>
      a.id === athlete.id ? { ...a, isFilled: !a.isFilled } : a
    );
    setAthletes(updatedAthletes);

    // Update backend (example API request)
    fetch(`${import.meta.env.VITE_API_URL}/api/my-athletes/${athlete.id}/`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...athlete, isFilled: !athlete.isFilled }),
    }).catch((err) => console.error('Failed to update filled status:', err));
  };

  const handleDelete = (athleteId) => {
    if (window.confirm('Are you sure you want to delete this athlete?')) {
      setAthletes(athletes.filter((a) => a.id !== athleteId));

      // Delete from backend
      fetch(`${import.meta.env.VITE_API_URL}/api/my-athletes/${athleteId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
      }).catch((err) => console.error('Failed to delete athlete:', err));
    }
  };

  if (error) return <h2>{error}</h2>;
  if (athletes.length === 0) return <h2>No athletes found</h2>;

  return (
    <div className="container">
      <h1>Your Athletes</h1>
      <ul>
        {athletes.map((athlete) => (
          <li key={athlete.id}>
            <div className="athlete-info">
              <p>{athlete.first_name} {athlete.last_name} - {athlete.sport}</p>
              <p>Progress: {athlete.progress || 'Not set'}</p>
              <label>
                <input
                  type="checkbox"
                  checked={athlete.isFilled || false}
                  onChange={() => handleToggleFilled(athlete)}
                />
                Amount Filled
              </label>
            </div>
            <div className="action-buttons">
              <button onClick={() => handleEditProgress(athlete)} className="edit-button">
                Edit Progress
              </button>
              <button onClick={() => handleDelete(athlete.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAthletesPage;
