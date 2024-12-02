import { Link } from "react-router-dom";
import "./AthleteCard.css";

function AthleteCard(props) {
  const { athleteData } = props;

  return (
    <div className="athlete-card">
      {/* Athlete Information */}
      <img
        src={athleteData.image}
        alt={`${athleteData.first_name} ${athleteData.last_name}`}
      />
      <div className="athlete-card-content">
        <h3>
          {athleteData.first_name} {athleteData.last_name}
        </h3>
        <p>Sport: {athleteData.sport}</p>
        <p>Age: {athleteData.age}</p>
        <Link to={`/athlete/${athleteData.id}`}>View Details</Link>
      </div>
    </div>
  );
}

export default AthleteCard;
