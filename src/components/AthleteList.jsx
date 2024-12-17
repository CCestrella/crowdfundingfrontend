import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AthleteList() {
    const [athletes, setAthletes] = useState([]); // State for all athletes
    const [error, setError] = useState(null); // State for errors

    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/athletes/`);
                if (!response.ok) throw new Error("Failed to fetch athletes");
                const data = await response.json();
                console.log("Fetched Athletes:", data); // Debug: Check what is fetched
                setAthletes(data); // Set the fetched athletes
            } catch (err) {
                console.error(err);
                setError("Unable to load athletes");
            }
        };

        fetchAthletes();
    }, []);

    if (error) {
        return <h2>{error}</h2>; // Display error if fetch fails
    }

    if (athletes.length === 0) {
        return <h2>No athletes found</h2>; // Display message if no data
    }

    return (
        <div>
            <h1>All Athletes</h1>
            <ul>
                {athletes.map((athlete) => (
                    <li key={athlete.id || athlete.first_name}>
                        <Link to={`/athlete/${athlete.id}`}>
                            {athlete.first_name} {athlete.last_name} - {athlete.sport}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AthleteList;
