async function signUp(username, password, firstName, lastName, email, role) {
    const url = `${import.meta.env.VITE_API_URL}/users/`; // The sign-up endpoint
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: role, // Add the role field here
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error signing up the user`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default signUp;
