import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import type { IProduct } from "../../Model/IProduct";
import ProductList from "../../Components/ProductList";
import requests from "../../api/requests";

function CatalogPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

useEffect(() => {
    const loadProducts = async () => {
        try {
            const data = await requests.Catalog.list();
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    loadProducts();
}, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Katalog Sayfası
      </Typography>

        <ProductList products={products} />
    </Container>
  );
}

export default CatalogPage;