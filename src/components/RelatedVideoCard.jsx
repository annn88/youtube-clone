import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const RelatedVideoCard = ({ video }) => {
  return (
    <Link
      to={`/video/${video.id?.videoId}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          mb: 2,
          cursor: "pointer",
          "&:hover img": {
            transform: "scale(1.03)",
          },
        }}
      >
        <Box
          component="img"
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          sx={{
            width: 180,
            height: 100,
            borderRadius: "12px",
            objectFit: "cover",
            transition: ".3s",
          }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {video.snippet.title}
          </Typography>

          <Typography
            sx={{
              color: "#aaa",
              fontSize: 13,
              mt: 0.5,
            }}
          >
            {video.snippet.channelTitle}
          </Typography>

          <Typography
            sx={{
              color: "#777",
              fontSize: 12,
            }}
          >
            {new Date(video.snippet.publishedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default RelatedVideoCard;