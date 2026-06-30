import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";

import Sidebar from "./Sidebar";
import VideoCard from "./VideoCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const { category } = useParams();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Home Page - Trending Videos
    if (!category || category === "Home") {
      fetchFromAPI(
        "videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=20"
      )
        .then((data) => {
          setVideos(data.items || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }

    // Categories
    else {
      const categoryQueries = {
        Music: "music",
        Gaming: "gaming",
        News: "news",
        Sports: "sports",
        Coding: "programming",
        Education: "education",
      };

      const query = categoryQueries[category] || category;

      fetchFromAPI(
        `search?part=snippet&q=${query}&type=video&maxResults=20`
      )
        .then((data) => {
          setVideos(data.items || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [category]);

  return (
    <Stack direction={{ xs: "column", md: "row" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "240px" },
          borderRight: "1px solid #3d3d3d",
          backgroundColor: "#000",
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#121212",
          minHeight: "90vh",
          p: 3,
        }}
      >
        <Typography
          variant="h4"
          color="white"
          sx={{
            mb: 3,
            fontWeight: "bold",
          }}
        >
          {category && category !== "Home"
            ? `${category} Videos`
            : "🔥 Trending Videos"}
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
            }}
          >
            <CircularProgress color="error" />
          </Box>
        ) : videos.length === 0 ? (
          <Typography
            color="gray"
            align="center"
          >
            No videos found.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
            }}
          >
            {videos.map((video) => (
              <VideoCard
                key={video.id.videoId || video.id}
                video={video}
              />
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Feed;