import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";
import "./LoginForm.css";

function LoginForm() {
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth();

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
                    // Store the token consistently
                    window.localStorage.setItem("authToken", response.token);
    
                    // Set authentication state
                    setAuth({
                        token: response.token,
                        firstName: response.first_name, // Assuming the API returns `first_name`
                    });
    
                    // Redirect to the landing page
                    navigate("/landing");
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
