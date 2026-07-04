import { useEffect, useState } from "react";
import { CssBaseline, Container } from "@mui/material";
import Header from "./Components/Header";


import type { IProduct } from "../Model/IProduct";
import { Outlet } from "react-router";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Ürünler alınamadı:", error));
  }, []);

  return (
    <>
      <CssBaseline />

      <Header />

      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;