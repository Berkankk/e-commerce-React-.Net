import type { IProduct } from "../Model/IProduct";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router";
import { useState } from "react";
import { useAppDispatch } from "../Hooks/hooks";
import { addItemToCart } from "../Pages/Cart/cartSlice";
import { toast } from "react-toastify";

type ProductItemProps = {
  product: IProduct;
};

function ProductItem({ product }: ProductItemProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (isLoading || product.stock === 0) return;

    try {
      setIsLoading(true);
      await dispatch(
        addItemToCart({ productId: product.id, quantity: 1 })
      ).unwrap();
      toast.success("Ürün sepete eklendi!");
    } catch (error) {
      toast.error("Ürün sepete eklenemedi.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.14)",
        },
      }}
    >
      <Box sx={{ position: "relative", bgcolor: "#f7f9fc" }}>
        <CardMedia
          component="img"
          height="220"
          image={`http://localhost:5164/images/images/${product.productImageUrl}`}
          alt={product.productName}
          sx={{
            objectFit: "contain",
            p: 2,
          }}
        />

        <Chip
          label={product.stock > 0 ? "Stokta" : "Tükendi"}
          color={product.stock > 0 ? "success" : "error"}
          size="small"
          sx={{
            position: "absolute",
            left: 12,
            bottom: 12,
            fontWeight: 600,
          }}
        />


      </Box>

      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          {product.productName}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.productDescription}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Rating value={4.5} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            4.5
          </Typography>
        </Box>

        <Typography variant="h6" color="primary" fontWeight={800}>
          ₺{product.productPrice.toLocaleString("tr-TR")}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Stok: {product.stock}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          {/* <IconButton color="primary" sx={{ border: "1px solid #ddd" }}>
            <ShoppingCartOutlinedIcon />
          </IconButton> */}
          <IconButton
            color="primary"
            sx={{ border: "1px solid #ddd" }}
            onClick={handleAddToCart}
            disabled={isLoading || product.stock === 0}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>

          {/* <IconButton sx={{ border: "1px solid #ddd" }}>
            <VisibilityOutlinedIcon />
          </IconButton> */}
          <IconButton
          component={Link}
          to={`/catalog/${product.id}`}
          sx={{ border: "1px solid #ddd" }}
        >
          <VisibilityOutlinedIcon />
        </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductItem;