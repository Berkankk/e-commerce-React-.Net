import { useEffect, useState } from "react";
import requests from "../../api/requests";
import type { Cart } from "../../Model/ICart";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function ShoppingCartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requests.Cart.get()
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  const cartItems = cart?.cartItems ?? [];

  if (cartItems.length === 0) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4">Sepetinizde ürün yok</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="right">
                <strong>Fiyat</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Adet</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Toplam</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.productId}>
                <TableCell sx={{ width: 120 }}>
                  <Box
                    component="img"
                    // src={item.imageUrl}
                    src={`http://localhost:5164/images/images/${item.imageUrl}`}
                    alt={item.name}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: "contain",
                    }}
                  />
                </TableCell>

                <TableCell>
                  <Typography>{item.name}</Typography>
                </TableCell>

                <TableCell align="right">
                  {item.price}
                </TableCell>

                <TableCell align="right">
                  {item.quantity}
                </TableCell>

                <TableCell align="right">
                  {item.price * item.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}