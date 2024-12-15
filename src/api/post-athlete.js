async function postAthlete(payload) {
  const url = `${import.meta.env.VITE_API_URL}/athletes/`;
  const token = localStorage.getItem("authToken"); // Correct key name
  console.log("Token in postAthlete:", token); // Debugging

  if (!token) {
    alert("Authentication token is missing. Please log in again.");
    throw new Error("Missing authentication token");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Include token here
      },
      body: JSON.stringify(payload),
    });

    console.log("Response from server:", response); // Debugging response

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData); // Log error
      throw new Error(errorData.detail || "Error creating athlete");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating athlete:", error);
    throw error;
  }
}

export default postAthlete;
