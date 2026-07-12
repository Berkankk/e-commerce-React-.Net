import { useEffect } from "react";
import { CssBaseline, Container, CircularProgress, Box } from "@mui/material";
import Header from "./Components/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./Hooks/hooks";
import { fetchCart } from "./Pages/Cart/cartSlice";

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.cart.loading);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
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