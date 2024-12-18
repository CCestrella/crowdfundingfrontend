import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";

function AthletePage() {
  const { id } = useParams();
  const { project, isLoading, error } = useProject(id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h2>{project.title}</h2>
      <h3>Created at: {project.date_created}</h3>
      <h3>{`Status: ${project.is_open ? "Open" : "Closed"}`}</h3>
      <h3>Total Pledges: ${project.pledges.reduce((sum, pledge) => sum + parseFloat(pledge.amount), 0)}</h3>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledge, index) => (
          <li key={index}>
            ${pledge.amount} from {pledge.anonymous ? "Anonymous" : pledge.supporter}
            <p>Comment: {pledge.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AthletePage;
