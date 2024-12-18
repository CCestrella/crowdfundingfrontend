import React, { useState } from "react";
import signUp from "../api/sign-up"; // Assuming the signUp function is in an `api` folder
import "./SignUp.css"; // Import the CSS file

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "donor", // Default role is "donor"
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const newUser = await signUp(
                formData.username,
                formData.password,
                formData.firstName,
                formData.lastName,
                formData.email,
                formData.role // Add role to the API payload
            );
            setSuccess(`User created successfully! ID: ${newUser.id}`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="signup-input"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="signup-input"
                    required
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="signup-input"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="signup-input"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="signup-input"
                    required
                />

                {/* Dropdown menu for user role */}
                <label htmlFor="role">Choose your role:</label>
                <select
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="signup-input"
                    required
                >
                    <option value="athlete">Athlete</option>
                    <option value="donor">Donor</option>
                    <option value="both">Both</option>
                </select>

                <button type="submit" className="signup-button">
                    Sign Up
                </button>
            </form>
            {error && <p className="signup-error">{error}</p>}
            {success && <p className="signup-success">{success}</p>}
        </div>
    );
};

export default SignUp;
