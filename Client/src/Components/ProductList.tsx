import type { IProduct } from "../../Model/IProduct";
import ProductItem from "./ProductItem";
import {
  Grid,
  Button,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

type ProductListProps = {
  products: IProduct[];
};

function ProductList({ products }: ProductListProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Ürünler
          </Typography>
          <Typography color="text.secondary">
            {products.length} ürün listeleniyor
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />}>
          Yeni Ürün Ekle
        </Button>
      </Box>

      <TextField
        fullWidth
        placeholder="Ürün, kategori veya marka ara..."
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;