import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-page-wrapper">
            <div className="landing-page">
                <h1>Welcome to Champs Fund!</h1>
                <p>What would you like to do?</p>
                <div className="landing-options">
                    <Link to="/pledges" className="landing-button">
                        Donate
                    </Link>
                    <Link to="/athlete/new" className="landing-button">
                        Create Athlete Profile
                    </Link>
                    <Link to="/athletes" className="landing-button">
                        See All Athletes
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default LandingPage;
