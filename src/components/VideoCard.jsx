import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Card
      component={Link}
      to={`/video/${video.id}`}
      sx={{
        width: { xs: "100%", sm: "340px" },
        backgroundColor: "#181818",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.4)",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.6)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={video.thumbnail}
        alt={video.title}
        sx={{
          height: 200,
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            color: "#fff",
            lineHeight: 1.4,
            mb: 1,
          }}
        >
          {video.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#aaa",
            mb: 0.5,
          }}
        >
          {video.channel}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "#777",
            fontSize: "13px",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#777" }}
          >
            {video.views}
          </Typography>

          <Typography
            variant="caption"
            sx={{ color: "#777" }}
          >
            {video.uploaded}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;