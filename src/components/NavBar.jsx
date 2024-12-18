import { Link, Outlet } from "react-router-dom";
import { useAuth } from "/src/hooks/use-auth.jsx";
import "./NavBar.css"; 
import logo from '../assets/cflogo.svg';

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("firstName");
    setAuth({ token: null, firstName: null });  // Reset the auth context
  };

  const firstName = auth.firstName || localStorage.getItem("firstName");

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          
          {/* Conditionally render based on authentication */}
          {auth.token ? (
            <>
              <span className="nav-welcome">Welcome, {firstName || "User"}!</span>
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
      <Outlet />
    </div>
  );
}

export default NavBar;
