import { allAthletes } from "../data";
import AthleteCard from "../components/AthleteCard";

function AthletePage() {
  return (
    <div>
      <h1>All Athletes!!!</h1>
      <div className="athletes-list">
        {allAthletes.map((athlete) => (
          <AthleteCard key={athlete.id} athleteData={athlete} />
        ))}
      </div>
    </div>
  );
}

export default AthletePage;

export function AthleteList() {
  return (
    <div id="athlete-list">
      {allAthletes.map((athleteData, key) => (
        <div key={key}>{athleteData.title}</div>
      ))}
    </div>
  );
}
