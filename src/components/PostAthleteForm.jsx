import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postAthlete } from "../api/post-athlete.js";
import "./PostAthleteForm.css";

function PostAthleteForm() {
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");

    const olympicSports = [
        "Archery", "Athletics", "Badminton", "Baseball/Softball", "Basketball",
        "Boxing", "Canoe/Kayak", "Cycling", "Diving", "Equestrian", "Fencing",
        "Football (Soccer)", "Golf", "Gymnastics", "Handball", "Hockey", "Judo",
        "Modern Pentathlon", "Rowing", "Rugby", "Sailing", "Shooting", "Skateboarding",
        "Sport Climbing", "Surfing", "Swimming", "Table Tennis", "Taekwondo", "Tennis",
        "Triathlon", "Volleyball", "Weightlifting", "Wrestling"
    ];

    const [athleteData, setAthleteData] = useState({
        first_name: "",
        last_name: "",
        bio: "",
        age: "",
        sport: "",
        goal: "",
        funds_raised: "",
        is_open: "true",
        funding_breakdown: "",
        achievements: "",
        image: "",
        video: "",
        progress_updates: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Authentication token is missing. Redirecting to login...");
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setAthleteData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!athleteData.first_name || !athleteData.last_name || !athleteData.age || !athleteData.sport) {
            alert("Please fill in all required fields.");
            return;
        }

        const payload = {
            first_name: athleteData.first_name,
            last_name: athleteData.last_name,
            bio: athleteData.bio || "",
            age: parseInt(athleteData.age, 10),
            sport: athleteData.sport,
            goal: parseFloat(parseFloat(athleteData.goal).toFixed(2)),
            funds_raised: parseFloat(athleteData.funds_raised) || 0,
            is_open: athleteData.is_open === "true",
            funding_breakdown: athleteData.funding_breakdown || "",
            achievements: athleteData.achievements || "",
            image: athleteData.image || "",
            video: athleteData.video || "",
            progress_updates: athleteData.progress_updates || "",
        };

        try {
            console.log("Submitting Payload:", payload);
            const result = await postAthlete(payload);
            console.log("Athlete created successfully:", result);
            setSuccessMessage("Athlete Successfully Created");
            alert("Athlete created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            // alert(error.message || "An error occurred while creating the athlete. Please try again.");
        }
    };

    return (
        <div>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="create-athlete-form-container" onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    value={athleteData.first_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    value={athleteData.last_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="bio">Bio:</label>
                <textarea
                    id="bio"
                    value={athleteData.bio}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    value={athleteData.age}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="sport">Sport:</label>
                <select
                    id="sport"
                    value={athleteData.sport}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select a sport</option>
                    {olympicSports.map((sport) => (
                        <option key={sport} value={sport}>
                            {sport}
                        </option>
                    ))}
                </select>

                <label htmlFor="goal">Goal (USD):</label>
                <input
                    type="number"
                    id="goal"
                    value={athleteData.goal}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="funds_raised">Funds Raised:</label>
                <input
                    type="number"
                    id="funds_raised"
                    value={athleteData.funds_raised}
                    onChange={handleChange}
                />

                <label htmlFor="is_open">Is Open:</label>
                <select
                    id="is_open"
                    value={athleteData.is_open.toString()}
                    onChange={handleChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label htmlFor="funding_breakdown">Funding Breakdown:</label>
                <textarea
                    id="funding_breakdown"
                    value={athleteData.funding_breakdown}
                    onChange={handleChange}
                />

                <label htmlFor="achievements">Achievements:</label>
                <textarea
                    id="achievements"
                    value={athleteData.achievements}
                    onChange={handleChange}
                />

                <label htmlFor="image">Image URL:</label>
                <input
                    type="url"
                    id="image"
                    value={athleteData.image}
                    onChange={handleChange}
                />

                <label htmlFor="video">Video URL:</label>
                <input
                    type="url"
                    id="video"
                    value={athleteData.video}
                    onChange={handleChange}
                />

                <label htmlFor="progress_updates">Progress Updates:</label>
                <textarea
                    id="progress_updates"
                    value={athleteData.progress_updates}
                    onChange={handleChange}
                />

                <button type="submit">Create Athlete</button>
            </form>
        </div>
    );
}

export default PostAthleteForm;
