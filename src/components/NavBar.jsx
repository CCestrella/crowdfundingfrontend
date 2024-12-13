import { Link, Outlet } from "react-router-dom";
import "./NavBar.css"; // Add this CSS file for styles
import logo from '../assets/cflogo.svg';
// import useAuth from "../hooks/use-auth.js";
// import useAuth from "/src/hooks/use-auth.js";
import { useAuth } from "/src/hooks/use-auth.js";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  console.log(auth)

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo"><img src={logo} alt="Logo" /></div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/users" className="nav-link">Sign Up</Link>
          {/* <Link to="/login" className="nav-link">Raise Fund</Link> */}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
