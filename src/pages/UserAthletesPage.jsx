import './UserAthletesPage.css';
import React, { useEffect, useState } from 'react';
import AthleteList from '../components/AthleteList'; // Ensure this is the correct path

const UserAthletesPage = () => {
  const [athletes, setAthletes] = useState([]); // Initialized as an empty array
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
      athlete.progress_updates || ""
    );
    if (newProgress) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/athletes/${athlete.id}/`, {
          method: "PUT",
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ progress_updates: newProgress }), // Ensure this field is included
        });

        if (!response.ok) {
          throw new Error("Failed to update progress");
        }

        const updatedAthlete = await response.json();
        setAthletes((prev) =>
          prev.map((a) => (a.id === updatedAthlete.id ? updatedAthlete : a))
        );
        alert("Progress updated successfully!");
      } catch (error) {
        console.error("Failed to update progress:", error);
        alert("Failed to update progress");
      }
    }
  };

  const handleDelete = async (athleteId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/my-athletes/${athleteId}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete athlete');
      }

      setAthletes((prev) => prev.filter((athlete) => athlete.id !== athleteId));
      alert('Athlete deleted successfully!');
    } catch (error) {
      console.error('Failed to delete athlete:', error);
      alert('Failed to delete athlete');
    }
  };

  return (
    <div>
      <h1>User Athletes</h1>
      {error && <p>{error}</p>}
      <AthleteList athletes={athletes} onEditProgress={handleEditProgress} onDelete={handleDelete} />
    </div>
  );
};

export default UserAthletesPage;