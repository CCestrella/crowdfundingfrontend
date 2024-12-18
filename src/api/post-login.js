async function postLogin(username, password) {
  const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
  const response = await fetch(url, {
      method: "POST", // Sending a POST request with JSON data
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          "username": username,
          "password": password,
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

  // Parse the response as JSON
  const data = await response.json();

  // Store the authentication token
  localStorage.setItem("authToken", data.token);

  // Store the user's first name or username (update this depending on your API response)
  localStorage.setItem("firstName", data.first_name || username);

  // Return the response
  return data;
}

export default postLogin;
