import { useParams } from "react-router-dom";
import { allAthletes } from "../data";

function AthleteInfo() {
  const { id } = useParams(); // Get athlete ID from URL
  const athlete = allAthletes.find((athlete) => athlete.id === parseInt(id)); // Find the specific athlete

  if (!athlete) {
    return <h2>Athlete not found</h2>;
  }

  return (
    <div>
      <h2>
        {athlete.first_name} {athlete.last_name}
      </h2>
      <h3>Sport: {athlete.sport}</h3>
      <h3>Age: {athlete.age}</h3>
      <h3>Created at: {athlete.date_created}</h3>
      <h3>{`Status: ${athlete.is_open ? "Open for funding" : "Closed for funding"}`}</h3>
      <h3>Goal: ${athlete.goal}</h3>
      <h3>Achievements:</h3>
      <p>{athlete.achievements}</p>
      <h3>Pledges:</h3>
      {athlete.pledges && athlete.pledges.length > 0 ? (
        <ul>
          {athlete.pledges.map((pledgeData, key) => (
            <li key={key}>
              ${pledgeData.amount} from{" "}
              {pledgeData.anonymous
                ? "Anonymous"
                : `Supporter ${pledgeData.supporter}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pledges available.</p>
      )}
    </div>
  );
}

export default AthleteInfo;
