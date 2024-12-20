async function postLogin(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
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
  
    const data = await response.json();
    console.log("Login API Response:", data); // Debug API response
  
    // Store token and first name in localStorage
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("firstName", data.first_name || username); // Ensure first_name is set
  
    return data;
  }
  
  export default postLogin;
  