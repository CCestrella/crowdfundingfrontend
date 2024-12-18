async function postPledge(amount, comment, anonymous, athlete_profile_id) {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
    }

    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    console.log("Payload:", {
        amount: amount,
        comment: comment || "",
        anonymous: anonymous,
        is_fulfilled: true,
        athlete_profile: athlete_profile_id, // Pass the athlete_profile ID
    });

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`, // Ensure this token is valid
        },
        body: JSON.stringify({
            amount: amount,
            comment: comment || "",
            anonymous: anonymous,
            is_fulfilled: true,
            athlete_profile: athlete_profile_id, // Pass the athlete_profile ID
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.detail || "Failed to create pledge.");
    }

    return await response.json();
}

export default postPledge;