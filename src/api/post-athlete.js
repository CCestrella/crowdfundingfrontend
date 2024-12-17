const postAthlete = async (payload) => {
  const token = localStorage.getItem("authToken"); // Ensure 'authToken' is used

  console.log("Token being sent:", token); // Log the token for debugging

  if (!token) {
    alert("Authentication token is missing. Please log in.");
    return;
  }

  const url = `${import.meta.env.VITE_API_URL}/athlete/new/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`, // Use 'Token' prefix as required by DRF
      },
      body: JSON.stringify(payload),
    });
    console.log("Authorization Header:", `Token ${token}`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(errorData.detail || "Failed to create athlete profile.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating athlete:", error);
    throw error;
  }
};

export { postAthlete };