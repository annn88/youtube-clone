import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  // Works for BOTH endpoints
  const videoId = video.id?.videoId || video.id;

  return (
    <Card
      component={Link}
      to={`/video/${videoId}`}
      sx={{
        width: { xs: "100%", sm: "340px" },
        backgroundColor: "#181818",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "0.3s",

        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          video.snippet?.thumbnails?.high?.url ||
          video.snippet?.thumbnails?.medium?.url
        }
        alt={video.snippet?.title}
      />

      <CardContent>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {video.snippet?.title}
        </Typography>

        <Typography
          variant="body2"
          color="gray"
        >
          {video.snippet?.channelTitle}
        </Typography>

        <Typography
          variant="caption"
          color="gray"
        >
          {new Date(
            video.snippet?.publishedAt
          ).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;