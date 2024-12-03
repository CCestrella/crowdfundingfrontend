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