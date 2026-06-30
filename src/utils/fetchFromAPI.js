const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchFromAPI = async (endpoint) => {
  const response = await fetch(
    `${BASE_URL}/${endpoint}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
  );

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error("Failed to fetch YouTube API");
  }

  return response.json();
};