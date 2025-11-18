// frontend/src/api.js
const API_BASE_URL = 'http://localhost:3000/api'; // Ensure this matches your backend URL

export async function searchPlayers(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/players?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // The API returns { meta: {}, data: [] }
  } catch (error) {
    console.error("Error searching players:", error);
    return [];
  }
}

// You can add more API functions here for other CRUD operations
