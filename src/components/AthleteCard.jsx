import React, { useState } from "react";
import "./AthleteCard.css";
import { Link } from "react-router-dom";

const AthleteCard = ({ athleteData }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`athlete-card ${isFlipped ? "is-flipped" : ""}`}
            onClick={handleFlip}
        >
            <div className="athlete-card-inner">
                {/* Front Face */}
                <div className="athlete-card__face athlete-card__face--front">
                    <img
                        src={athleteData.image || "https://via.placeholder.com/280x180"}
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
                    <div>
                        <h3>{athleteData.first_name} {athleteData.last_name}</h3>
                        <p>Bio: {athleteData.bio || "No bio available"}</p>
                        <p>Achievements: {athleteData.achievements || "None listed"}</p>
                        <p>Funds Raised: ${athleteData.funds_raised || "0.00"}</p>
                        <p>Goal: ${athleteData.goal}</p>
                        <p>Funding Breakdown: {athleteData.funding_breakdown || "Not available"}</p>
                        <p>Progress Updates: {athleteData.progress_updates || "No updates available"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AthleteCard;
