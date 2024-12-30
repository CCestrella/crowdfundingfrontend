import './UserAthletesPage.css';
import React, { useEffect, useState } from 'react';

const UserAthletesPage = () => {
  const [athletes, setAthletes] = useState([]); // Initialize athletes
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchUserAthletes();
  }, []);

  const handleEditProgress = async (athlete) => {
    const newProgress = prompt(
      `Edit progress for ${athlete.first_name} ${athlete.last_name}`,
      athlete.progress_updates || ''
    );
    if (newProgress) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/athletes/${athlete.id}/`, {
          method: 'PUT',
          headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ progress_updates: newProgress }),
        });

        if (!response.ok) {
          throw new Error('Failed to update progress');
        }

        const updatedAthlete = await response.json();
        setAthletes((prev) =>
          prev.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a))
        );
        alert('Progress updated successfully!');
      } catch (error) {
        console.error('Failed to update progress:', error);
        alert('Failed to update progress');
      }
    }
  };

  const handleDelete = (athleteId) => {
    if (window.confirm('Are you sure you want to delete this athlete?')) {
      fetch(`${import.meta.env.VITE_API_URL}/api/my-athletes/${athleteId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
      })
        .then(() => {
          setAthletes((prev) => prev.filter((a) => a.id !== athleteId));
        })
        .catch((err) => {
          setError('Failed to delete athlete. Please try again.');
          console.error(err);
        });
    }
  };

  if (error) return <h2>{error}</h2>;
  if (athletes.length === 0) return <h2>No athletes found</h2>;

  return (
    <div className="wrapper2">
      <div className="container">
        <h1>Your Athletes</h1>
        <ul className="athlete-list">
          {athletes.map((athlete) => (
            <li key={athlete.id} className="athlete-card">
              <div className="athlete-card-content">
                <h2>
                  {athlete.first_name} {athlete.last_name}
                </h2>
                
                <p><strong>Age:</strong> {athlete.age}</p>
                <p><strong>Sport:</strong> {athlete.sport}</p>
                <p><strong>Goal (USD):</strong> ${athlete.goal || 'Not specified'}</p>
                <p><strong>Funds Raised:</strong> ${athlete.funds_raised || '0.00'}</p>
                <p><strong>Bio:</strong> {athlete.bio || 'No bio available'}</p>
                <p><strong>Funding Breakdown:</strong> {athlete.funding_breakdown || 'Not available'}</p>
                <p><strong>Achievements:</strong> {athlete.achievements || 'None listed'}</p>
                <p><strong>Progress Updates:</strong> {athlete.progress_updates || 'No updates available'}</p>
                <label>
                  <input
                    type="checkbox"
                    checked={athlete.isFilled || false}
                    onChange={() => handleEditProgress(athlete)}
                  />
                  Amount Filled
                </label>
                <div className="action-buttons">
                  <button onClick={() => handleEditProgress(athlete)} className="edit-button">
                    Edit Progress
                  </button>
                  <button onClick={() => handleDelete(athlete.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserAthletesPage;