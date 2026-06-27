import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  if (!video?.snippet) return null;

  const videoId = video.id?.videoId || video.id;

  return (
    <Link
      to={`/video/${videoId}`}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: 340 },
          backgroundColor: "#181818",
          borderRadius: "16px",
          overflow: "hidden",
          transition: "0.3s ease",
          cursor: "pointer",

          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 25px rgba(255,0,0,0.25)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="190"
          image={
            video.snippet.thumbnails?.high?.url ||
            video.snippet.thumbnails?.medium?.url ||
            video.snippet.thumbnails?.default?.url
          }
          alt={video.snippet.title}
          sx={{
            transition: "0.3s",

            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        <CardContent
          sx={{
            backgroundColor: "#181818",
            p: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "16px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.4,
            }}
          >
            {video.snippet.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#9e9e9e",
              mt: 1,
              fontSize: "14px",
            }}
          >
            {video.snippet.channelTitle}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoCard;