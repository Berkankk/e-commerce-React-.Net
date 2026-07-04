import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import type { IProduct } from "../../Model/IProduct";
import ProductList from "../../Components/ProductList";

function CatalogPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("http://localhost:5164/api/Products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log("Ürünler yüklenirken hata oluştu:", error));
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        Katalog Sayfası
      </Typography>

        <ProductList products={products} />
    </Container>
  );
}

export default CatalogPage;