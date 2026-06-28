import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { videos } from "../utils/videos";
import VideoCard from "./VideoCard";

const SearchFeed = () => {
  const { searchTerm } = useParams();

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#121212",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        color="white"
        sx={{ mb: 3, fontWeight: "bold" }}
      >
        Search Results for "{searchTerm}"
      </Typography>

      {filteredVideos.length === 0 ? (
        <Typography color="gray">
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
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchFeed;