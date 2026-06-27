import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "./VideoCard";

const SearchFeed = () => {
  const { searchTerm } = useParams();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);

      const data = await fetchFromAPI("search", {
        part: "snippet",
        q: searchTerm,
        maxResults: 12,
        type: "video",
      });

      if (data?.items) {
        setVideos(data.items);
      } else {
        setVideos([]);
      }

      setLoading(false);
    };

    getSearchResults();
  }, [searchTerm]);

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#0f0f0f",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Search Results
      </Typography>

      <Typography
        sx={{
          color: "#ff0000",
          mb: 3,
          fontSize: "18px",
        }}
      >
        Results for "{searchTerm}"
      </Typography>

      <Typography
        sx={{
          color: "#aaa",
          mb: 3,
        }}
      >
        {videos.length} video(s) found
      </Typography>

      {videos.length === 0 ? (
        <Typography
          sx={{
            color: "#fff",
            textAlign: "center",
            mt: 8,
            fontSize: "20px",
          }}
        >
          No videos found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {videos.map((video) => (
            <VideoCard
              key={video.id.videoId}
              video={{
                ...video,
                id: video.id.videoId,
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchFeed;