import { Box } from "@mui/material";
import VideoCard from "./VideoCard";

const Videos = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#121212",
        p: 1,
      }}
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id.videoId || video.id}
          video={{
            ...video,
            id: video.id.videoId || video.id,
          }}
        />
      ))}
    </Box>
  );
};

export default Videos;