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
          const { token, first_name } = response;  // Ensure first_name is included in the response
          // Store both token and first_name in localStorage and context
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("firstName", first_name); 

          setAuth({
            token: token,
            firstName: first_name,  // Set the firstName in context
          });

          navigate("/landing");  // Redirect to landing page after login
        })
        .catch((error) => {
          console.error("Login failed:", error);
        });
    }
  };

  return (
    <div>
      <form className="login-page">
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
