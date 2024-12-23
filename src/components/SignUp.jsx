import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signUp from "../api/sign-up"; // Assuming the signUp function is in an `api` folder
import "./SignUp.css"; // Import the CSS file

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "donor", // Default role is "Donor"
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true); // Set loading to true

    try {
      await signUp(formData);
      setSuccess("User created successfully!");
      setTimeout(() => {
        navigate("/landing"); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      if (error.message.includes("already exists")) {
        setError("User already exists");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false); // Set loading to false after the request finishes
    }
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label htmlFor="role">Choose your role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="donor">donor</option>
          <option value="athlete">athlete</option>
          <option value="both">both</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"} {/* Show loading text */}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
