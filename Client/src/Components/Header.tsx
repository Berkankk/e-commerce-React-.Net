import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import {
  useAppDispatch,
  useAppSelector,
} from "../Hooks/hooks";

import {
  logout,
} from "../Pages/Account/AccountSlice";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /*
    Redux içerisindeki sepet bilgisini alıyoruz.
  */
  const cart = useAppSelector(
    (state) => state.cart.cart
  );

  /*
    Redux içerisindeki giriş yapan kullanıcıyı alıyoruz.

    Kullanıcı giriş yapmadıysa:
    user = null

    Kullanıcı giriş yaptıysa:
    user = {
      userName,
      email,
      token
    }
  */
  const user = useAppSelector(
    (state) => state.account.user
  );

  const itemCount =
    cart?.cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    ) ?? 0;

  /*
    Çıkış Yap butonuna basıldığında çalışır.
  */
  const handleLogout = () => {
    /*
      AccountSlice içerisindeki logout action çalışır.

      Bu işlem:
      - Redux account.user bilgisini temizler.
      - localStorage içerisindeki user bilgisini siler.
    */
    dispatch(logout());

    /*
      Kullanıcıyı ana sayfaya gönderiyoruz.
    */
    navigate("/", {
      replace: true,
    });
  };

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
                  bgcolor:
                    "rgba(255,255,255,0.18)",
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
          {/*
            Kullanıcı giriş yaptıysa:
            - Kullanıcı adı
            - Çıkış Yap butonu

            Kullanıcı giriş yapmadıysa:
            - Login
            - Register
          */}
          {user ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  mr: 0.5,
                }}
              >
                <AccountCircleOutlinedIcon
                  sx={{
                    color: "white",
                  }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.userName}
                </Typography>
              </Box>

              <Button
                type="button"
                onClick={handleLogout}
                startIcon={
                  <LogoutOutlinedIcon />
                }
                sx={{
                  color: "white",
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2,

                  "&:hover": {
                    bgcolor:
                      "rgba(255,255,255,0.18)",
                  },
                }}
              >
                Çıkış Yap
              </Button>
            </>
          ) : (
            authLinks.map((link) => (
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
                    bgcolor:
                      "rgba(255,255,255,0.18)",
                    fontWeight: 700,
                  },
                }}
              >
                {link.title}
              </Button>
            ))
          )}

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