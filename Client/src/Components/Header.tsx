import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, Link } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const links = [
  { title: "Home", to: "/" },
  { title: "Catalog", to: "/catalog" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
  { title: "Error", to: "/error" },
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

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/cart" size="large" color="inherit">
            <Badge badgeContent={2} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}