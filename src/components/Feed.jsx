import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import VideoCard from "./VideoCard";
import { videos } from "../utils/videos";

const Feed = () => {
  const [allVideos] = useState(videos);

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
        <Typography variant="h4" color="white" sx={{ mb: 3 }}>
          🎬 Trending Videos
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {allVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default Feed;