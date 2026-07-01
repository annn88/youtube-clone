import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#0f0f0f",
        borderBottom: "1px solid #272727",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "64px",
          px: { xs: 1, md: 3 },
        }}
      >
        {/* LEFT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: { md: 170 },
          }}
        >
          <IconButton sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube"
              sx={{
                height: { xs: 20, md: 24 },
              }}
            />
          </Link>
        </Box>

        {/* CENTER */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 650,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: 42,
                  borderRadius: "25px 0 0 25px",
                  backgroundColor: "#121212",
                  color: "#fff",

                  "& fieldset": {
                    borderColor: "#303030",
                  },

                  "&:hover fieldset": {
                    borderColor: "#555",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: "#3ea6ff",
                  },
                },

                input: {
                  color: "#fff",
                },
              }}
            />

            <Tooltip title="Search">
              <IconButton
                onClick={handleSearch}
                sx={{
                  width: 64,
                  height: 42,
                  borderRadius: "0 25px 25px 0",
                  bgcolor: "#222",
                  border: "1px solid #303030",
                  borderLeft: "none",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#333",
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Tooltip title="Search with your voice">
                <IconButton
                  sx={{
                    ml: 1,
                    bgcolor: "#222",
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "#333",
                    },
                  }}
                >
                  <MicIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Tooltip title="Create">
              <IconButton sx={{ color: "#fff" }}>
                <VideoCallOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Tooltip title="Notifications">
              <IconButton sx={{ color: "#fff" }}>
                <NotificationsNoneOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Avatar
            sx={{
              width: 34,
              height: 34,
              bgcolor: "#3ea6ff",
              cursor: "pointer",
            }}
          >
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;