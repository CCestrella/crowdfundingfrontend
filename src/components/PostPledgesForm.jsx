import React, { useState, useEffect } from "react";
import "./PostPledgesForm.css"; // Import the CSS file

function PostPledgesForm() {
    const [athletes, setAthletes] = useState([]); // List of athletes
    const [filteredAthletes, setFilteredAthletes] = useState([]); // Filtered list based on search
    const [selectedAthlete, setSelectedAthlete] = useState(null); // Selected athlete
    const [formData, setFormData] = useState({
        amount: "",
        comment: "",
        anonymous: false,
    });
    const [searchQuery, setSearchQuery] = useState(""); // For the search bar
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch athletes from the API
    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/athletes/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch athletes");
                }
                const data = await response.json();
                setAthletes(data); // Save the list of athletes
            } catch (err) {
                console.error(err);
                setError("Unable to load athletes");
            }
        };

        fetchAthletes();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Dynamically filter athletes as the user types
        if (query.trim() === "") {
            setFilteredAthletes([]);
        } else {
            const matches = athletes.filter((athlete) =>
                `${athlete.first_name} ${athlete.last_name}`
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
            setFilteredAthletes(matches);
        }
    };

    const handleReset = () => {
        // Reset the form and athlete selection
        setSearchQuery("");
        setFilteredAthletes([]);
        setSelectedAthlete(null);
        setFormData({
            amount: "",
            comment: "",
            anonymous: false,
        });
        setError(null);
        setSuccessMessage("");
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAthlete) {
            setError("Please select an athlete to donate to.");
            return;
        }
        setError(null);
        setSuccessMessage("");

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/pledges/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    athlete_profile: selectedAthlete.id, // Link the pledge to the athlete's ID
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to create pledge");
            }

            const result = await response.json();
            setSuccessMessage("Pledge created successfully!");
            setFormData({ amount: "", comment: "", anonymous: false }); // Reset the form
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="pledge-container">
            <h1>Create a Pledge</h1>

            {error && <p className="pledge-error">{error}</p>}
            {successMessage && <p className="pledge-success">{successMessage}</p>}

            <div className="athlete-search">
                <input
                    type="text"
                    placeholder="Search for an athlete"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pledge-input"
                />
                {filteredAthletes.length > 0 && (
                    <ul className="athlete-list">
                        {filteredAthletes.map((athlete) => (
                            <li
                                key={athlete.id}
                                className={`athlete-item ${
                                    selectedAthlete?.id === athlete.id ? "selected" : ""
                                }`}
                                onClick={() => setSelectedAthlete(athlete)}
                            >
                                {athlete.first_name} {athlete.last_name} - {athlete.bio}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selectedAthlete && (
                <p>
                    Selected Athlete:{" "}
                    <strong>{selectedAthlete.first_name} {selectedAthlete.last_name}</strong>
                </p>
            )}

            <form onSubmit={handleSubmit} className="pledge-form">
                <div>
                    <label htmlFor="amount">Amount ($):</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        min="1"
                        step="0.01"
                        className="pledge-input"
                    />
                </div>

                <div>
                    <label htmlFor="comment">Comment (Optional):</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="Add a comment"
                        className="pledge-textarea"
                    />
                </div>

                <div className="pledge-checkbox">
                    <input
                        type="checkbox"
                        id="anonymous"
                        name="anonymous"
                        checked={formData.anonymous}
                        onChange={handleChange}
                    />
                    <label htmlFor="anonymous">Donate Anonymously</label>
                </div>

                <button type="submit" className="pledge-button">
                    Submit Pledge
                </button>
                <button type="button" className="pledge-reset-button" onClick={handleReset}>
                    Reset
                </button>
            </form>
        </div>
    );
}

export default PostPledgesForm;
