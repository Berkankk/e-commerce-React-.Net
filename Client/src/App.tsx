import { useEffect, useState } from "react";
import { CssBaseline, Container, CircularProgress, Box } from "@mui/material";
import Header from "./Components/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import requests from "./api/requests";
import { useCartContext } from "./Context/CartContext";

function App() {
  const { setCart } = useCartContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requests.Cart.get()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [setCart]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />

      <Header />

      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;