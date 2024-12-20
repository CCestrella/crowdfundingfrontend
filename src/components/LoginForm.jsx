import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.jsx";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      postLogin(credentials.username, credentials.password)
        .then((response) => {
          const { token, first_name } = response;
          localStorage.setItem("authToken", token);
          localStorage.setItem("firstName", first_name);

          setAuth({
            token: token,
            firstName: first_name || credentials.username, // Default to username if first_name is missing
          });

          navigate("/landing");
        })
        .catch((error) => {
          console.error("Login failed:", error);
          setError("Login failed. Please check your credentials.");
        });
    }
  };

  return (
    <div>
      <form className="login-page">
        {error && <p className="error">{error}</p>} {/* Display error */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
