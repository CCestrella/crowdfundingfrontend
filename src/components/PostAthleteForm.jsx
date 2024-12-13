import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postAthlete from "../api/post-athlete.js";
// import "./CreateAthleteForm.css";
import "./PostPledgesForm.css";

function CreateAthleteForm() {
    const navigate = useNavigate();

    const [athleteData, setAthleteData] = useState({
        first_name: "",
        last_name: "",
        bio: "",
        age: "",
        sport: "",
        goal: "",
        funds_raised: "",
        funding_breakdown: "",
        achievements: "",
        image: null,
        video: null,
        progress_updates: "",
    });

    const handleChange = (event) => {
        const { id, value, type, files } = event.target;
        setAthleteData((prevData) => ({
            ...prevData,
            [id]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            first_name,
            last_name,
            bio,
            age,
            sport,
            goal,
            funds_raised,
            funding_breakdown,
            achievements,
            image,
            video,
            progress_updates,
        } = athleteData;

        if (first_name && last_name && bio && age && sport && goal) {
            postAthlete(
                first_name,
                last_name,
                bio,
                age,
                sport,
                goal,
                image,
                video,
                funds_raised,
                funding_breakdown,
                achievements,
                progress_updates
            ).then(() => {
                navigate("/"); // Navigate to home or a confirmation page after successful submission
            });
        }
    };

    return (
        <div>
            <form className="create-athlete-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        placeholder="Enter first name"
                        value={athleteData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        placeholder="Enter last name"
                        value={athleteData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        placeholder="Enter bio"
                        value={athleteData.bio}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age" min="5" max="18"
                        placeholder="Enter age"
                        value={athleteData.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sport">Sport:</label>
                    <input
                        type="text"
                        id="sport"
                        placeholder="Enter sport"
                        value={athleteData.sport}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="goal">Goal:</label>
                    <input
                        type="text"
                        id="goal"
                        placeholder="Enter goal"
                        value={athleteData.goal}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="funds_raised">Funds Raised:</label>
                    <input
                        type="number"
                        id="funds_raised"
                        placeholder="Enter funds raised"
                        value={athleteData.funds_raised}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="funding_breakdown">Funding Breakdown:</label>
                    <textarea
                        id="funding_breakdown"
                        placeholder="Enter funding breakdown"
                        value={athleteData.funding_breakdown}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="achievements">Achievements:</label>
                    <textarea
                        id="achievements"
                        placeholder="Enter achievements"
                        value={athleteData.achievements}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="video">Video:</label>
                    <input
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="progress_updates">Progress Updates:</label>
                    <textarea
                        id="progress_updates"
                        placeholder="Enter progress updates"
                        value={athleteData.progress_updates}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Create Athlete</button>
            </form>
        </div>
    );
}

export default CreateAthleteForm;
