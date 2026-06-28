import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import VideoDetail from "./components/VideoDetail";
import Footer from "./components/Footer";
import SearchFeed from "./components/SearchFeed";

const App = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/category/:category" element={<Feed />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default App;