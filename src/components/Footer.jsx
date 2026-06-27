import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0f0f0f",
        borderTop: "1px solid #303030",
        textAlign: "center",
        py: 3,
      }}
    >
      <Typography variant="body2" color="#aaa">
        © 2026 YouTube Clone
      </Typography>

      <Typography variant="body2" color="#666">
        Built with React • Material UI • YouTube Data API
      </Typography>
    </Box>
  );
};

export default Footer;