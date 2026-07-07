import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { IProduct } from "../../../Model/IProduct";
import { AddShoppingCart } from "@mui/icons-material";
import requests from "../../api/requests";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

export default function ProductDetails() {


    const [loading, setLoading] = useState(true);
    const [addItemLoading, setAddItemLoading] = useState(false);

    function handleAddItem(productId: number) {
      setAddItemLoading(true);

      requests.Cart.addItem(productId)
        .then(() => {
          toast.success("Ürün sepete eklendi.");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Ürün sepete eklenemedi.");
        })
        .finally(() => setAddItemLoading(false));
    }

  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);


  useEffect(() => {
    fetch(`http://localhost:5164/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Yükleniyor...</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Ürün bulunamadı.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 6 }}>
      <Button
        component={Link}
        to="/catalog"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3, textTransform: "none" }}
      >
        Kataloğa Dön
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 5,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "#f7f9fc",
              borderRadius: 4,
              p: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 420,
            }}
          >
            <img
              src={`http://localhost:5164/images/images/${product.productImageUrl}`}
              alt={product.productName}
              style={{
                maxWidth: "100%",
                maxHeight: 360,
                objectFit: "contain",
              }}
            />
          </Box>

          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip
                label={product.stock > 0 ? "Stokta" : "Tükendi"}
                color={product.stock > 0 ? "success" : "error"}
                size="small"
              />

              {product.isActive && (
                <Chip label="Aktif Ürün" color="primary" size="small" />
              )}
            </Stack>

            <Typography variant="h3" fontWeight={800} sx={{ mb: 2 }}>
              {product.productName}
            </Typography>

            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography color="text.secondary">4.5</Typography>
            </Stack>

            <Typography color="text.secondary" sx={{ mb: 3, fontSize: 17 }}>
              {product.productDescription}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h4" color="primary" fontWeight={900}>
              ₺{product.productPrice.toLocaleString("tr-TR")}
            </Typography>

            <Typography sx={{ mt: 1, mb: 4 }} color="text.secondary">
              Stok adedi: {product.stock}
            </Typography>

                <Button
              variant="outlined"
              size="small"
              startIcon={
                addItemLoading ? (
                  <CircularProgress size={18} />
                ) : (
                  <AddShoppingCart />
                )
              }
              color="success"
              onClick={() => handleAddItem(product.id)}
              disabled={product.stock <= 0 || addItemLoading}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.4,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              {addItemLoading ? "Ekleniyor..." : "Ürün Ekle"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}