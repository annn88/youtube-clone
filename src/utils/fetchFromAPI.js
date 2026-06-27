import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        key: API_KEY,
        ...params,
      },
    });

    return data;
  } catch (error) {
    console.error("API Error:", error);
  }
};