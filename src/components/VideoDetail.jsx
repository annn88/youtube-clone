import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useParams } from "react-router-dom";

import RelatedVideoCard from "./RelatedVideoCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const { id } = useParams();

  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  


useEffect(() => {
  setLoading(true);

  fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => {
      if (!data.items || data.items.length === 0) {
        setLoading(false);
        return;
      }

      const video = data.items[0];
      setVideoDetail(video);

      
      return fetchFromAPI(
        `search?part=snippet&q=${encodeURIComponent(
          video.snippet.title
        )}&type=video&maxResults=10`
      );
    })
    .then((data) => {
      if (data) {
        setRelatedVideos(
          (data.items || []).filter(
            (item) => item.id?.videoId !== id
          )
        );
      }

      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
      >
        <CircularProgress color="error" />
      </Box>
    );
  }

  if (!videoDetail) {
    return (
      <Typography
        color="white"
        textAlign="center"
        mt={5}
      >
        Video not found.
      </Typography>
    );
  }

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
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </Box>

       <Typography
  variant="h5"
  sx={{
    mt: 2,
    fontWeight: 700,
    color: "#fff",
  }}
>
  {videoDetail.snippet.title}
</Typography>

<Stack
  direction={{ xs: "column", md: "row" }}
  justifyContent="space-between"
  alignItems={{ xs: "flex-start", md: "center" }}
  spacing={2}
  mt={3}
>
  <Stack direction="row" spacing={2} alignItems="center">
    <Avatar
      sx={{
        width: 48,
        height: 48,
      }}
    >
      {videoDetail.snippet.channelTitle.charAt(0)}
    </Avatar>

    <Box>
      <Typography fontWeight={600}>
        {videoDetail.snippet.channelTitle}
      </Typography>

      <Typography
        sx={{
          color: "#aaa",
          fontSize: 14,
        }}
      >
        Official Channel
      </Typography>
    </Box>

    <Button
      variant="contained"
      sx={{
        bgcolor: "#fff",
        color: "#000",
        borderRadius: "20px",
        textTransform: "none",
        ml: 2,
        px: 3,

        "&:hover": {
          bgcolor: "#ddd",
        },
      }}
    >
      Subscribe
    </Button>
  </Stack>

  <Stack direction="row" spacing={1}>
    <IconButton
      sx={{
        bgcolor: "#272727",
        color: "#fff",
      }}
    >
      <ThumbUpOffAltIcon />
    </IconButton>

    <IconButton
      sx={{
        bgcolor: "#272727",
        color: "#fff",
      }}
    >
      <ThumbDownOffAltIcon />
    </IconButton>

    <IconButton
      sx={{
        bgcolor: "#272727",
        color: "#fff",
      }}
    >
      <ShareIcon />
    </IconButton>

    <IconButton
      sx={{
        bgcolor: "#272727",
        color: "#fff",
      }}
    >
      <BookmarkBorderIcon />
    </IconButton>
  </Stack>
</Stack>

<Paper
  elevation={0}
  sx={{
    mt: 3,
    bgcolor: "#272727",
    color: "#fff",
    borderRadius: "14px",
    p: 2,
  }}
>
  <Typography fontWeight={600}>
    {Number(
      videoDetail.statistics?.viewCount || 0
    ).toLocaleString()} views
  </Typography>

  <Typography
    sx={{
      mt: 1,
      whiteSpace: "pre-wrap",
    }}
  >
    {videoDetail.snippet.description}
  </Typography>
</Paper>

<Button
  variant="contained"
  color="error"
  href={`https://www.youtube.com/watch?v=${id}`}
  target="_blank"
  sx={{
    mt: 3,
    borderRadius: "25px",
    px: 4,
    textTransform: "none",
  }}
>
  Watch on YouTube
</Button>
      </Box>

            {/* Related Videos */}
      <Box flex={1}>
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Related Videos
        </Typography>

        <Stack spacing={1}>
          {relatedVideos.map((video) => (
            <RelatedVideoCard
              key={video.id?.videoId || video.id}
              video={video}
            />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default VideoDetail;