async function postAthlete(first_name, last_name, bio, age, sport, goal, image, video) {
  const url = `${import.meta.env.VITE_API_URL}/athletes/`;
  const response = await fetch(url, {
    method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      bio: bio,
      age: age,
      sport: sport,
      goal: goal,
      funds_raised: funds_raised,
      is_open: true,
      funding_breakdown: funding_breakdown,
      achievements: achievements,
      image: image,
      video: video,
      progress_updates: progress_updates,
    }),
  });

  if (!response.ok) {
    const fallbackError = `Error trying to login`;

    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postAthlete;