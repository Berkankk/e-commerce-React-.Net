import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import { Link, NavLink } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../Hooks/hooks";

const links = [
  { title: "Home", to: "/" },
  { title: "Catalog", to: "/catalog" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
  { title: "Error", to: "/error" },
];

const authLinks = [
  {
    title: "Login",
    to: "/login",
  },
  {
    title: "Register",
    to: "/register",
  },
];

export default function Header() {
  const cart = useAppSelector((state) => state.cart.cart);

  const itemCount =
    cart?.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    ) ?? 0;

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        {/* Logo / Uygulama adı */}
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          E-Commerce App
        </Typography>

        {/* Ana menü */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
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

        {/* Kullanıcı işlemleri ve sepet */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {authLinks.map((link) => (
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

          <IconButton
            component={Link}
            to="/cart"
            size="large"
            color="inherit"
            aria-label="Sepete git"
          >
            <Badge
              badgeContent={itemCount}
              color="secondary"
              showZero
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}