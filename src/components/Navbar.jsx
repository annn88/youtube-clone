import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  IconButton,
  InputAdornment,
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
          gap: 2,
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
            minWidth: "170px",
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
                height: 24,
              }}
            />
          </Link>
        </Box>

        {/* CENTER SEARCH */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "700px",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 42,
                borderRadius: "25px",
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearch}
                    sx={{
                      bgcolor: "#222",
                      borderRadius: "50%",
                      color: "#fff",

                      "&:hover": {
                        bgcolor: "#333",
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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

        {/* RIGHT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Tooltip title="Create">
            <IconButton sx={{ color: "#fff" }}>
              <VideoCallOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton sx={{ color: "#fff" }}>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
          </Tooltip>

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