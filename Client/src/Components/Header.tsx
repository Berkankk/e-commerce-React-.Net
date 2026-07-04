import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink,Link  } from "react-router";

const links = [
  { title: "Home", to: "/" },
  { title: "Catalog", to: "/catalog" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
];

export default function Header() {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          E-Commerce App
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {links.map((link) => (
            <Button
              key={link.to}
              component={NavLink}
              to={link.to}
              sx={{
                color: "white",
                textTransform: "none",
                borderRadius: 2,
                px: 2,
                "&.active": {
                  bgcolor: "rgba(255,255,255,0.18)",
                  fontWeight: 700,
                },
              }}
            >
              {link.title}
            </Button>
            
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}