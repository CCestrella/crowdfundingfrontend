import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.jsx";
import "./NavBar.css";
import logo from "../assets/cflogo.svg";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ token: null, user: null }); // Reset auth context
    navigate("/"); // Redirect to home
  };

  const userName = auth.user || localStorage.getItem("user");

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
            <span className="nav-welcome">Welcome, {userName || "User"}!</span>
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
