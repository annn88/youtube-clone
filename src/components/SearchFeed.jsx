import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import VideoCard from "./VideoCard";

const SearchFeed = () => {
  const { searchTerm } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(
      `search?part=snippet&q=${searchTerm}&type=video&maxResults=20`
    )
      .then((data) => {
        setVideos(data.items || []);
      })
      .catch((err) => console.error(err));
  }, [searchTerm]);

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

      {videos.length === 0 ? (
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
          {videos.map((video) => (
            <VideoCard
              key={video.id.videoId}
              video={video}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchFeed;