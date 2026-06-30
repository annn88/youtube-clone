import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  if (!video?.snippet) return null;

  const videoId = video.id?.videoId || video.id;
  const thumbnail =
    video.snippet?.thumbnails?.high?.url ||
    video.snippet?.thumbnails?.medium?.url;

  return (
    <Card
      component={Link}
      to={`/video/${videoId}`}
      elevation={0}
      sx={{
        width: {
          xs: "100%",
          sm: "340px",
          md: "360px",
        },
        bgcolor: "#0f0f0f",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "14px",
        overflow: "hidden",
        transition: "0.25s",

        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={thumbnail}
        alt={video.snippet.title}
        sx={{
          width: "100%",
          aspectRatio: "16 / 9",
          objectFit: "cover",
          borderRadius: "14px",
        }}
      />

      <CardContent sx={{ p: 1.5 }}>
        <Stack direction="row" spacing={1.5}>
          <Avatar
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              video.snippet.channelTitle
            )}&background=random`}
            sx={{
              width: 40,
              height: 40,
            }}
          />

          <Stack spacing={0.5}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#fff",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
              }}
            >
              {video.snippet.title}
            </Typography>

            <Typography
              sx={{
                color: "#aaa",
                fontSize: "14px",
              }}
            >
              {video.snippet.channelTitle}
            </Typography>

            <Typography
              sx={{
                color: "#888",
                fontSize: "13px",
              }}
            >
              {new Date(video.snippet.publishedAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VideoCard;