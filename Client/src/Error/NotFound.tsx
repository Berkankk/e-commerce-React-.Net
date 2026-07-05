import { Button, Container, Divider, Typography } from "@mui/material";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h2" color="error" gutterBottom>
        404
      </Typography>

      <Typography variant="h4" gutterBottom>
        Sayfa Bulunamadı
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Aradığınız sayfa bulunamadı. Sayfa silinmiş, taşınmış veya yanlış bir
        adres girmiş olabilirsiniz.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
      >
        Ana Sayfaya Dön
      </Button>
    </Container>
  );
}