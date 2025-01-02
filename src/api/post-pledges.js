const postPledge = async (amount, comment, anonymous, athlete_profile) => {
  const token = localStorage.getItem("authToken");
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pledges/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      amount,
      comment,
      anonymous,
      athlete_profile,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text(); // Use text() to log the response
    console.error("Pledge error:", errorData);
    throw new Error(errorData || "Failed to create pledge");
  }

  return response.json();
};

export default postPledge;