import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AthleteInfo() {
    const { id } = useParams(); // Get athlete ID from URL
    const [athletes, setAthletes] = useState([]); // Store all athletes
    const [athlete, setAthlete] = useState(null); // Store selected athlete
    const [error, setError] = useState(null);

    // Fetch all athletes from the backend API
    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/athletes/`);
                if (!response.ok) throw new Error("Failed to fetch athletes");
                const data = await response.json();
                setAthletes(data);

                // Find the specific athlete based on the ID
                const selectedAthlete = data.find(
                    (athlete) => athlete.id === parseInt(id)
                );
                setAthlete(selectedAthlete);
            } catch (err) {
                console.error(err);
                setError("Unable to load athletes");
            }
        };

        fetchAthletes();
    }, [id]);

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!athlete) {
        return <h2>Athlete not found</h2>;
    }

    return (
        <div>
            <h2>
                {athlete.first_name} {athlete.last_name}
            </h2>
            <h3>Sport: {athlete.sport}</h3>
            <h3>Age: {athlete.age}</h3>
            <h3>Created at: {athlete.date_created}</h3>
            <h3>
                Status: {athlete.is_open ? "Open for funding" : "Closed for funding"}
            </h3>
            <h3>Goal: {athlete.goal}</h3>
            <h3>Achievements:</h3>
            <p>{athlete.achievements}</p>
            <h3>Pledges:</h3>
            {athlete.pledges && athlete.pledges.length > 0 ? (
                <ul>
                    {athlete.pledges.map((pledgeData, key) => (
                        <li key={key}>
                            {`${pledgeData.amount} from `}
                            {pledgeData.anonymous ? (
                                "Anonymous"
                            ) : (
                                `Supporter: ${pledgeData.supporter}`
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pledges yet.</p>
            )}
        </div>
    );
}

export default AthleteInfo;
