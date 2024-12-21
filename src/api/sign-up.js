async function signUp(formData) {
    const url = `${import.meta.env.VITE_API_URL}/users/`; // The sign-up endpoint
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        first_name: formData.firstName, // Convert camelCase to snake_case
        last_name: formData.lastName,  // Convert camelCase to snake_case
        email: formData.email,
        role: formData.role, // Ensure this matches backend expectations
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `User Already Exists`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  

  export default signUp;