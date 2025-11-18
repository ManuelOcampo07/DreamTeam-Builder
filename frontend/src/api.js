const API_BASE_URL = 'http://localhost:3000/api';

export async function searchPlayers(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/players?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error searching players:", error);
    return [];
  }
}
