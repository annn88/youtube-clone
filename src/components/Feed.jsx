import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
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

    const query =
      category && category !== "Home"
        ? category
        : "Trending";

    fetchFromAPI(
      `search?part=snippet&q=${query}&type=video&maxResults=24`
    )
      .then((data) => {
        setVideos(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: {
           xs: 70,
          md: 240,
         },
          flexShrink: 0,
          borderRight: "1px solid #272727",
          backgroundColor: "#0f0f0f",
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          p: {
            xs: 2,
            md: 3,
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            mb: 3,
          }}
        >
          {category ? category : "Trending"}
        </Typography>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 8,
            }}
          >
            <CircularProgress color="error" />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: 3,

              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2,1fr)",
                md: "repeat(3,1fr)",
                lg: "repeat(4,1fr)",
              },
            }}
          >
            {videos.map((video) => (
              <VideoCard
                key={video.id?.videoId || video.id}
                video={video}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Feed;