import React, { useState, useEffect } from "react"; // Import React once with hooks
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./PostPledgesForm.css"; // Import the CSS file
import postPledge from "../api/post-pledges"; // Import the postPledge function

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
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Hook for navigation

    // Authentication Check
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("You must be logged in to create a pledge.");
            navigate("/login"); // Redirect to login page
        }
    }, [navigate]);

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
        setLoading(true); // Set loading to true

        if (!selectedAthlete) {
            setError("Please select an athlete to donate to.");
            setLoading(false); // Set loading to false
            return;
        }

        const payload = {
            amount: parseFloat(formData.amount),
            comment: formData.comment || "",
            anonymous: formData.anonymous,
            is_fulfilled: true,
            athlete_profile: selectedAthlete.id,
        };

        // Debugging athlete ID and payload
        console.log("Selected Athlete ID:", selectedAthlete?.id);
        console.log("Payload being sent:", payload);

        try {
            const result = await postPledge(
                payload.amount,
                payload.comment,
                payload.anonymous,
                payload.athlete_profile
            );
            setSuccessMessage("Pledge created successfully!");
            setFormData({ amount: "", comment: "", anonymous: false });
            setLoading(false); // Set loading to false
            window.location.reload(); // Refresh the page
        } catch (err) {
            setError(err.message || "Failed to submit pledge.");
            alert("An error occurred. Please check the console for details.");
            console.error("Error:", err.message);
            setLoading(false); // Set loading to false
        }
    };

    return (
        <div className="pledge-container">
            <h1>Create a Pledge</h1>

            {error && <p className="pledge-error">{error}</p>}
            {successMessage && <p className="pledge-success">{successMessage}</p>}
            {loading && <p className="pledge-loading">Submitting your pledge...</p>} {/* Loading message */}

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
                                className={`athlete-item ${selectedAthlete?.id === athlete.id ? "selected" : ""
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
                    <strong>
                        {selectedAthlete.first_name} {selectedAthlete.last_name}
                    </strong>
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

                <button type="submit" className="pledge-button" disabled={loading}>
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


