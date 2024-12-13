async function postPledge(amount, comment, anonymous, athlete_profile_id, supporter_id) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const response = await fetch(url, {
        method: "POST", // Specify this is a POST request
        headers: {
            "Content-Type": "application/json", // Inform the server about the JSON payload
        },
        body: JSON.stringify({
            amount: amount,
            comment: comment || "", // Optional comment
            anonymous: anonymous,
            is_fulfilled: true, // Default to true since pledges are fulfilled upon creation
            athlete_profile: athlete_profile_id, // Link to the athlete profile by ID
            supporter: supporter_id, // Link to the user (supporter) by ID
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error creating the pledge`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json(); // Return the server's response as JSON
}

export default postPledge;
