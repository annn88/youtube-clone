import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import VideoCard from "./VideoCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const Feed = () => {
  const { category } = useParams();

  const [natureVideos, setNatureVideos] = useState([]);
  const [historyVideos, setHistoryVideos] = useState([]);
  const [scienceVideos, setScienceVideos] = useState([]);
  const [mathVideos, setMathVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [categoryVideos, setCategoryVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      if (category) {
        // Sidebar category selected
        const data = await fetchFromAPI("search", {
          part: "snippet",
          q: category,
          maxResults: 12,
          type: "video",
        });

        setCategoryVideos(data.items || []);
      } else {
        // Home page sections
        const [
          nature,
          history,
          science,
          math,
          trending,
        ] = await Promise.all([
          fetchFromAPI("search", {
            part: "snippet",
            q: "nature documentaries",
            maxResults: 8,
            type: "video",
          }),

          fetchFromAPI("search", {
            part: "snippet",
            q: "world history documentaries",
            maxResults: 8,
            type: "video",
          }),

          fetchFromAPI("search", {
            part: "snippet",
            q: "science documentaries",
            maxResults: 8,
            type: "video",
          }),

          fetchFromAPI("search", {
            part: "snippet",
            q: "mathematics tutorials",
            maxResults: 8,
            type: "video",
          }),

          fetchFromAPI("videos", {
            part: "snippet",
            chart: "mostPopular",
            regionCode: "IN",
            maxResults: 8,
          }),
        ]);

        setNatureVideos(nature.items || []);
        setHistoryVideos(history.items || []);
        setScienceVideos(science.items || []);
        setMathVideos(math.items || []);
        setTrendingVideos(trending.items || []);
      }
    };

    getVideos();
  }, [category]);

  const renderVideos = (title, videos) => (
    <>
      <Typography
        variant="h4"
        color="white"
        sx={{
          mt: 5,
          mb: 3,
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>

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
            key={video.id.videoId || video.id}
            video={video}
          />
        ))}
      </Box>
    </>
  );

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
          overflowY: "auto",
        }}
      >
        {category ? (
          renderVideos(category, categoryVideos)
        ) : (
          <>
            {renderVideos("🌿 Nature", natureVideos)}

            {renderVideos("🏛️ History", historyVideos)}

            {renderVideos("🔬 Science", scienceVideos)}

            {renderVideos("➗ Mathematics", mathVideos)}

            {renderVideos("🔥 Trending", trendingVideos)}
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Feed;