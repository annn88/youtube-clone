import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const VideoCard = ({ video }) => {
  return (
    <Card sx={{ width: 320, backgroundColor: "#1e1e1e", color: "white" }}>
      <CardMedia
        component="img"
        height="180"
        image={video.thumbnail}
        alt={video.title}
      />
      <CardContent>
        <Typography variant="body1">{video.title}</Typography>
        <Typography variant="body2" color="gray">
          {video.channel}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;