import { Link, Outlet } from "react-router-dom";
import "./NavBar.css"; // Add this CSS file for styles
import logo from '../assets/cflogo.svg';

function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo"><img src={logo} alt="Logo" /></div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/pledges" className="nav-link">Donate</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
