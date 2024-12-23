const fetchAthletes = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No auth token found in localStorage.');
            return;
        }

        console.log('Token being sent:', token); // Debugging log

        const response = await fetch(`${import.meta.env.VITE_API_URL}/my-athletes/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('Response status:', response.status); // Debugging log

        if (!response.ok) {
            const errorText = await response.text(); // Debug the error response
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
