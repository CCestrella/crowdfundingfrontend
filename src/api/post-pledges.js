async function postPledge(amount, comment, anonymous, athlete_profile_id) {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
    }

    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({
            amount: amount,
            comment: comment || "",
            anonymous: anonymous,
            is_fulfilled: true,
            athlete_profile: athlete_profile_id, // Corrected field name
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create pledge.");
    }

    return await response.json();
}

export default postPledge;
