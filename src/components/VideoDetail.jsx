import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

import VideoCard from "./VideoCard";
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
          mt={2}
          fontWeight="bold"
        >
          {videoDetail.snippet.title}
        </Typography>

        <Typography
          color="gray"
          mt={1}
        >
          {videoDetail.snippet.channelTitle}
        </Typography>

        <Typography
          color="gray"
        >
          {Number(
            videoDetail.statistics?.viewCount || 0
          ).toLocaleString()}{" "}
          views
        </Typography>

        <Typography
          mt={2}
          sx={{
            whiteSpace: "pre-wrap",
          }}
        >
          {videoDetail.snippet.description}
        </Typography>

        <Button
          variant="contained"
          color="error"
          href={`https://www.youtube.com/watch?v=${id}`}
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
      <Box flex={1}>
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={2}
        >
          Related Videos
        </Typography>

        <Stack spacing={2}>
          {relatedVideos.map((video) => (
            <VideoCard
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