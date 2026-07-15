import { Box, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router";
import Header from "./Components/Header";

function App() {
  const location = useLocation();

  const isAccountPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      <Header />

      {isAccountPage ? (
        <Box component="main">
          <Outlet />
        </Box>
      ) : (
        <Container
          component="main"
          maxWidth="xl"
          sx={{ py: 4 }}
        >
          <Outlet />
        </Container>
      )}
    </>
  );
}

export default App;