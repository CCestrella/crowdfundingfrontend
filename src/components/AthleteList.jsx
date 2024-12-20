import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './AthleteList.css'; // Import the updated CSS

function AthleteList() {
  const [athletes, setAthletes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/athletes/`);
        if (!response.ok) throw new Error("Failed to fetch athletes");
        const data = await response.json();
        setAthletes(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load athletes");
      }
    };

    fetchAthletes();
  }, []);

  const handleSendToOlympics = (athleteId) => {
    // Navigate to the pledges page (you can append athleteId as a query param if needed)
    navigate(`/pledges?athleteId=${athleteId}`);
  };

  if (error) {
    return <h2 style={{ textAlign: 'center', color: '#d9534f' }}>{error}</h2>;
  }

  if (athletes.length === 0) {
    return <h2 style={{ textAlign: 'center', color: '#5bc0de' }}>No athletes found</h2>;
  }

  return (
    <div className="athlete-list-container">
      {athletes.map((athlete) => (
        <div className="athlete-list-card" key={athlete.id}>
          <div className="athlete-list-card-inner">
            {/* Front Face */}
            <div className="athlete-list-card-face athlete-list-card-face--front">
              <img 
                src={athlete.image || 'https://via.placeholder.com/280x180'} 
                alt={`${athlete.first_name} ${athlete.last_name}`} 
              />
              <div className="athlete-list-card-content">
                <h3>{athlete.first_name} {athlete.last_name}</h3>
                <p>Sport: {athlete.sport}</p>
              </div>
            </div>
            {/* Back Face */}
            <div className="athlete-list-card-face athlete-list-card-face--back">
              <h3>Details</h3>
              <p>Age: {athlete.age}</p>
              <p>Achievements: {athlete.achievements || "None listed"}</p>
              <p>Bio: {athlete.bio || "No bio available"}</p>
              <button 
                className="send-to-olympics-button" 
                onClick={() => handleSendToOlympics(athlete.id)}
              >
                Send to Olympics
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AthleteList;
