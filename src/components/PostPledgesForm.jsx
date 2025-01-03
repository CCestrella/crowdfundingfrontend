import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./PostPledgesForm.css";
import postPledge from "../api/post-pledges"; // Correctly import the default export

function PostPledgesForm() {
    const [athletes, setAthletes] = useState([]);
    const [filteredAthletes, setFilteredAthletes] = useState([]);
    const [selectedAthlete, setSelectedAthlete] = useState(null);
    const [formData, setFormData] = useState({
        amount: "",
        comment: "",
        anonymous: false,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("You must be logged in to create a pledge.");
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/athletes/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch athletes");
                }
                const data = await response.json();
                setAthletes(data);

                const athleteId = searchParams.get("athleteId");
                if (athleteId) {
                    const selected = data.find((athlete) => athlete.id === parseInt(athleteId));
                    if (selected) {
                        setSelectedAthlete(selected);
                    }
                }
            } catch (err) {
                console.error(err);
                setError("Unable to load athletes");
            }
        };

        fetchAthletes();
    }, [searchParams]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

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
        setLoading(true);

        if (!selectedAthlete) {
            setError("Please select an athlete to donate to.");
            setLoading(false);
            return;
        }

        const payload = {
            amount: parseFloat(formData.amount),
            comment: formData.comment || "",
            anonymous: formData.anonymous,
            is_fulfilled: true,
            athlete_profile: selectedAthlete.id,
        };

        try {
            const result = await postPledge(
                payload.amount,
                payload.comment,
                payload.anonymous,
                payload.athlete_profile
            );
            console.log("Pledge created successfully:", result);

            const message = `Thank you for your donation of $${payload.amount.toFixed(
                2
            )} to ${selectedAthlete.first_name} ${selectedAthlete.last_name}!`;

            setSuccessMessage(message);
            alert(message); // Optional alert for success
            handleReset();
        } catch (err) {
            if (err.message.includes("Failed to create pledge")) {
                setError("Unable to create your pledge. Please ensure all fields are correctly filled.");
            } else if (err.message.includes("NetworkError")) {
                setError("Network error. Please check your internet connection.");
            } else {
                setError(err.message || "An unexpected error occurred.");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pledge-container">
            <h1>Create a Pledge</h1>

            {error && <p className="pledge-error">{error}</p>}
            {successMessage && <p className="pledge-success">{successMessage}</p>}
            {loading && <p className="pledge-loading">Submitting your pledge...</p>}

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
