import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

interface RemoveCartItemDialogProps {
  open: boolean;
  productName: string;
  productImageUrl?: string;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;

  /*
    Bu metinleri prop olarak alıyoruz.

    Böylece ileride localization eklediğimizde component'in
    iş mantığını değiştirmeden t("...") sonuçlarını gönderebiliriz.
  */
  title?: string;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}

export default function RemoveCartItemDialog({
  open,
  productName,
  productImageUrl,
  loading,
  onCancel,
  onConfirm,
  title = "Ürünü sepetten kaldır",
  description = "Bu ürünü sepetinizden kaldırmak istediğinize emin misiniz?",
  cancelLabel = "Vazgeç",
  confirmLabel = "Sepetten kaldır",
}: RemoveCartItemDialogProps) {
  const handleClose = (
    _event: unknown,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => {
    /*
      API isteği devam ederken dialog'un kapanmasını engelliyoruz.

      Kullanıcı silme işlemi devam ederken dışarı tıklarsa veya
      Escape tuşuna basarsa işlem arka planda sürerken pencerenin
      kapanması kafa karıştırıcı olabilir.
    */
    if (loading) {
      return;
    }

    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      onCancel();
      return;
    }

    onCancel();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="remove-cart-item-dialog-title"
      aria-describedby="remove-cart-item-dialog-description"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
          },
        },
      }}
    >
      <DialogTitle id="remove-cart-item-dialog-title">
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "error.lighter",
              color: "error.main",
              width: 48,
              height: 48,
            }}
          >
            <DeleteIcon />
          </Avatar>

          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Onayınız gerekiyor
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <DialogContentText id="remove-cart-item-dialog-description">
            {description}
          </DialogContentText>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              p: 2,
              bgcolor: "background.default",
            }}
          >
            {productImageUrl && (
              <Box
                component="img"
                src={productImageUrl}
                alt={productName}
                sx={{
                  width: 64,
                  height: 64,
                  objectFit: "contain",
                  borderRadius: 1.5,
                  bgcolor: "background.paper",
                  flexShrink: 0,
                }}
              />
            )}

            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700 }} noWrap>
                {productName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Sepetinizden tamamen kaldırılacak.
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              borderRadius: 2,
              p: 2,
              bgcolor: "error.lighter",
            }}
          >
            <Typography variant="body2" color="error.main">
              Ürünü daha sonra yeniden ekleyebilirsiniz; ancak mevcut sepet
              adedi kaldırılacaktır.
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          color="inherit"
          variant="outlined"
        >
          {cancelLabel}
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          color="error"
          variant="contained"
          startIcon={
            loading ? (
              <CircularProgress size={17} color="inherit" />
            ) : (
              <DeleteIcon />
            )
          }
        >
          {loading ? "Kaldırılıyor..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}