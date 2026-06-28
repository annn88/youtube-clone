import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0f0f0f",
        borderTop: "1px solid #303030",
        textAlign: "center",
        py: 3,
        mt: 5,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        YouTube Clone
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#888",
          mt: 1,
        }}
      >
        Built with React • Material UI • React Router • ReactPlayer
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#666",
          mt: 1,
        }}
      >
        Created by Ann Mariya Biju © 2026
      </Typography>
    </Box>
  );
};

export default Footer;