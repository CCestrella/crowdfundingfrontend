import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.jsx";
import "./NavBar.css";
import logo from "../assets/cflogo.svg";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    setAuth({ token: null, user: null }); // Reset auth context
    navigate("/login"); // Redirect to login page
  };

  // Retrieve the user's first name from auth or fallback to localStorage
  const userName =
    auth.user?.firstName || JSON.parse(localStorage.getItem("user"))?.firstName || "User";

  console.log("Auth context in NavBar:", auth); // Debugging
  console.log("LocalStorage user:", JSON.parse(localStorage.getItem("user"))); // Debugging
  console.log("Resolved userName:", userName); // Debugging


  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Champs Fund Logo" />
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {auth.token ? (
          <>
            {/* Welcome Message */}
            <span
              onClick={() => navigate("/my-athletes/")}
              className="nav-welcome"
              style={{ cursor: "pointer" }}
            >
              Welcome, {userName}!
            </span>
            {/* Logout Button */}
            <button onClick={handleLogout} className="nav-link logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/users" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
