import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Feed from "./components/Feed";

const App = () => {
  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/category/:category" element={<Feed />} />
      </Routes>
    </Box>
  );
};

export default App;