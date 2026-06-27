import { Stack, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { categories } from "../utils/constants";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack
      direction="column"
      sx={{
        backgroundColor: "#0f0f0f",
        height: "100vh",
        p: 2,
        overflowY: "auto",
      }}
    >
      {categories.map((category) => {
        const isActive =
          location.pathname === "/" && category.name === "Home"
            ? true
            : location.pathname === `/category/${category.name}`;

        return (
          <Button
            key={category.name}
            onClick={() =>
              navigate(
                category.name === "Home"
                  ? "/"
                  : `/category/${category.name}`
              )
            }
            sx={{
              justifyContent: "flex-start",
              color: "white",
              textTransform: "none",
              mb: 1,
              py: 1.2,
              px: 2,
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: 500,
              backgroundColor: isActive
                ? "#ff0000"
                : "transparent",
              transition: "0.3s",

              "&:hover": {
                backgroundColor: "#ff0000",
                transform: "translateX(5px)",
              },
            }}
          >
            <span
              style={{
                marginRight: "15px",
                fontSize: "22px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {category.icon}
            </span>

            {category.name}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Sidebar;