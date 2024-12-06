import React, { useState } from 'react';
import './AthleteCard.css';
import { Link } from 'react-router-dom';
import allAthletes from '../data'; // Import the athlete data array

const AthleteCard = ({ athleteData }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Fetch the specific athlete details by ID from allAthletes
    const athleteDetails = allAthletes.find(athlete => athlete.id === athleteData.id);

    return (
        <div
            className={`athlete-card ${isFlipped ? 'is-flipped' : ''}`}
            onClick={handleFlip}
        >
            <div className="athlete-card-inner">
                {/* Front Face */}
                <div className="athlete-card__face athlete-card__face--front">
                    <img
                        src={athleteData.image}
                        alt={`${athleteData.first_name} ${athleteData.last_name}`}
                    />
                    <div className="athlete-card-content">
                        <h3>
                            {athleteData.first_name} {athleteData.last_name}
                        </h3>
                        <p>Sport: {athleteData.sport}</p>
                        <p>Age: {athleteData.age}</p>
                        <Link to={`/login`}>Send to Olympics</Link>
                    </div>
                </div>

                {/* Back Face */}
                <div className="athlete-card__face athlete-card__face--back">
                    {athleteDetails && (
                        <div>
                            <h3>{athleteDetails.first_name} {athleteDetails.last_name}</h3>
                            <p>Bio: {athleteDetails.bio}</p>
                            <p>Achievements: {athleteDetails.achievements}</p>
                            <p>Funds Raised: ${athleteDetails.funds_raised}</p>
                            <p>Goal: ${athleteDetails.goal}</p>
                            <p>Funding Breakdown: {athleteDetails.funding_breakdown}</p>
                            <p>Progress Updates: {athleteDetails.progress_updates}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AthleteCard;
