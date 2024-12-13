async function signUp(username, password, firstName, lastName, email) {
    const url = `${import.meta.env.VITE_API_URL}/users/`; // The sign-up endpoint
    const response = await fetch(url, {
        method: "POST", // Specify that this is a POST request
        headers: {
            "Content-Type": "application/json", // Inform the server about the JSON payload
        },
        body: JSON.stringify({
            username: username,
            password: password,
            first_name: firstName, // Map the first name field
            last_name: lastName, // Map the last name field
            email: email, // Map the email field
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error signing up the user`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage); // Throw an error if the request fails
    }

    return await response.json(); // Return the server's response as JSON
}

export default signUp;
