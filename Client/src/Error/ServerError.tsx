import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            bgcolor: "error.main",
            color: "white",
            p: 3,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            500 Server Error
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Sunucu tarafında beklenmeyen bir hata oluştu.
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {state?.error ? (
            <>
              <Alert severity="error" sx={{ mb: 3 }}>
                {state.error.title}
              </Alert>

              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status Code
                  </Typography>
                  <Typography variant="h6" color="error">
                    {state.status}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Error Details
                  </Typography>

                  <Box
                    sx={{
                      bgcolor: "grey.100",
                      border: "1px solid",
                      borderColor: "grey.300",
                      borderRadius: 2,
                      p: 2,
                      maxHeight: 300,
                      overflow: "auto",
                    }}
                  >
                    <Typography
                      variant="body2"
                      component="pre"
                      sx={{
                        m: 0,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        fontFamily: "monospace",
                      }}
                    >
                      {state.error.detail || "Unknown error"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </>
          ) : (
            <Alert severity="warning">
              Hata detayı bulunamadı. Lütfen tekrar deneyin.
            </Alert>
          )}

          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{ mt: 4, borderRadius: 2 }}
          >
            Ana Sayfaya Dön
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}