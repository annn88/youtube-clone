import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";

const VideoDetail = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const getVideo = async () => {
      try {
        // Fetch video details
        const data = await fetchFromAPI("videos", {
          part: "snippet,statistics",
          id,
        });

        if (data?.items?.length > 0) {
          const currentVideo = data.items[0];
          setVideo(currentVideo);

          // Fetch related videos using channel name
          const related = await fetchFromAPI("search", {
            part: "snippet",
            q: currentVideo.snippet.channelTitle,
            type: "video",
            maxResults: 8,
          });

          if (related?.items) {
            setRelatedVideos(related.items);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getVideo();
  }, [id]);

  if (!video) {
    return (
      <Box
        sx={{
          backgroundColor: "#0f0f0f",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="error" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: 3,
        p: 3,
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
      }}
    >
      {/* Left Section */}
      <Box sx={{ flex: 3 }}>
        <Box
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
          }}
        >
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${id}`}
            controls
            width="100%"
            height="500px"
          />
        </Box>

        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            mt: 2,
            fontWeight: "bold",
            lineHeight: 1.5,
          }}
        >
          {video.snippet.title}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
          mt={2}
        >
          <Typography color="#b3b3b3" fontSize="16px">
            📺 {video.snippet.channelTitle}
          </Typography>

          <Typography color="#b3b3b3" fontSize="16px">
            👀{" "}
            {Number(
              video.statistics?.viewCount || 0
            ).toLocaleString()}{" "}
            Views
          </Typography>

          <Typography color="#b3b3b3" fontSize="16px">
            👍{" "}
            {Number(
              video.statistics?.likeCount || 0
            ).toLocaleString()}{" "}
            Likes
          </Typography>
        </Stack>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#181818",
          borderRadius: "16px",
          p: 2,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
            mb: 2,
          }}
        >
          Related Videos
        </Typography>

        <Videos videos={relatedVideos} />
      </Box>
    </Box>
  );
};

export default VideoDetail;