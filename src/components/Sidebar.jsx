import { Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";

const categories = [
  { name: "Home", icon: <HomeIcon /> },
  { name: "Music", icon: <MusicNoteIcon /> },
  { name: "Gaming", icon: <SportsEsportsIcon /> },
  { name: "News", icon: <NewspaperIcon /> },
  { name: "Sports", icon: <EmojiEventsIcon /> },
  { name: "Coding", icon: <CodeIcon /> },
  { name: "Education", icon: <SchoolIcon /> },
];

const Sidebar = () => {
  const location = useLocation();

  const current =
    location.pathname === "/"
      ? "Home"
      : decodeURIComponent(location.pathname.split("/").pop());

  return (
    <Stack
      spacing={1}
      sx={{
        p: 2,
        position: "sticky",
        top: "70px",
      }}
    >
      {categories.map((category) => {
        const selected = current === category.name;

        return (
          <Link
            key={category.name}
            to={
              category.name === "Home"
                ? "/"
                : `/category/${category.name}`
            }
            style={{
              textDecoration: "none",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: "12px",
                transition: "0.3s",
                backgroundColor: selected
                  ? "#272727"
                  : "transparent",
                color: "#fff",

                "&:hover": {
                  backgroundColor: "#272727",
                },
              }}
            >
              {category.icon}

              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: selected ? 600 : 400,
                }}
              >
                {category.name}
              </Typography>
            </Stack>
          </Link>
        );
      })}
    </Stack>
  );
};

export default Sidebar;