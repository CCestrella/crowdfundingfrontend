const fetchAthletes = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No auth token found');
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/my-athletes/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error('Fetch failed:', {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            });
            const errorText = await response.text();
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            const errorText = await response.text();
            throw new Error(`Expected JSON, but received: ${errorText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};
