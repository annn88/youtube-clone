import { Box, Typography, Stack, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { videos } from "../utils/videos";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const video = videos.find((v) => v.id === id);

  if (!video) {
    return (
      <Typography color="white" textAlign="center" mt={5}>
        Video not found.
      </Typography>
    );
  }

  const relatedVideos = videos.filter(
    (v) => v.category === video.category && v.id !== video.id
  );

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={3}
      sx={{
        backgroundColor: "#0f0f0f",
        color: "#fff",
        minHeight: "100vh",
        p: 3,
      }}
    >
      {/* Main Video */}
      <Box flex={3}>
        <Box
          sx={{
            borderRadius: "15px",
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${video.videoId}`}
            controls
            width="100%"
            height="500px"
          />
        </Box>

        <Typography
          variant="h5"
          mt={2}
          fontWeight="bold"
        >
          {video.title}
        </Typography>

        <Typography color="gray" mt={1}>
          {video.channel}
        </Typography>

        <Typography color="gray">
          {video.views} • {video.uploaded}
        </Typography>

        <Typography mt={2}>
          {video.description}
        </Typography>

        <Button
          variant="contained"
          color="error"
          href={`https://www.youtube.com/watch?v=${video.videoId}`}
          target="_blank"
          sx={{
            mt: 3,
            borderRadius: "25px",
            px: 4,
          }}
        >
          ▶ Watch on YouTube
        </Button>
      </Box>

      {/* Related Videos */}
      <Box
        flex={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          Related Videos
        </Typography>

        {relatedVideos.map((item) => (
          <Box
            key={item.id}
            onClick={() => navigate(`/video/${item.id}`)}
            sx={{
              display: "flex",
              gap: 2,
              cursor: "pointer",
              backgroundColor: "#1e1e1e",
              borderRadius: "10px",
              p: 1,
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#2b2b2b",
              },
            }}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{
                width: "170px",
                height: "95px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />

            <Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  color: "#aaa",
                  fontSize: "13px",
                  mt: 0.5,
                }}
              >
                {item.channel}
              </Typography>

              <Typography
                sx={{
                  color: "#777",
                  fontSize: "12px",
                  mt: 0.5,
                }}
              >
                {item.views}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

export default VideoDetail;