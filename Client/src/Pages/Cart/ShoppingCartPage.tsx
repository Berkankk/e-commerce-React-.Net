import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import {
  fetchCart,
  addItemToCart,
  deleteItemFromCart,
} from "../../Pages/Cart/cartSlice";
import RemoveCartItemDialog from "../../Components/RemoveCartItemDialog";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function ShoppingCartPage() {
  const cart = useAppSelector((state) => state.cart.cart);
  const loading = useAppSelector((state) => state.cart.loading);
  const dispatch = useAppDispatch();

  // Hangi ürünün API işlemi devam ediyor?
  const [updatingProductId, setUpdatingProductId] =
    useState<number | null>(null);

const [pendingRemovalProductId, setPendingRemovalProductId] =
  useState<number | null>(null);


  useEffect(() => {
    if (!cart) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  const getErrorMessage = (
    error: unknown,
    defaultMessage: string
  ) => {
    const axiosError = error as AxiosError<any>;

    return (
      axiosError.response?.data?.title ??
      axiosError.response?.data?.message ??
      defaultMessage
    );
  };

  const handleIncrease = async (
    productId: number
  ) => {
    /*
      Bu ürün için zaten devam eden bir işlem varsa
      ikinci isteği gönderme.
    */
    if (updatingProductId === productId) {
      return;
    }

    try {
      setUpdatingProductId(productId);
      await dispatch(addItemToCart({ productId, quantity: 1 })).unwrap();
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Ürün adedi artırılamadı."
        )
      );
    } finally {
      /*
        İstek başarılı olsa da hata alsa da
        butonların tekrar açılması gerekiyor.
      */
      setUpdatingProductId(null);
    }
  };

  const handleDecrease = async (
    productId: number
  ) => {
    if (updatingProductId === productId) {
      return;
    }

    try {
      setUpdatingProductId(productId);

      await dispatch(
        deleteItemFromCart({ productId, quantity: 1 })
      ).unwrap();
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Ürün adedi azaltılamadı."
        )
      );
    } finally {
      setUpdatingProductId(null);
    }
  };

const handleOpenRemoveDialog = (productId: number) => {
  /*
    Burada henüz API isteği göndermiyoruz.

    Sadece kullanıcının kaldırmak istediği ürünün
    ID'sini state'e yazıyoruz.
    pendingRemovalProductId dolu olduğu için dialog açılacak.
  */
  setPendingRemovalProductId(productId);
};

const handleCloseRemoveDialog = () => {
  /*
    Seçili ürün ID'sini temizlediğimizde dialog kapanır.
  */
  setPendingRemovalProductId(null);
};

const handleConfirmRemove = async () => {
  /*
    Herhangi bir ürün seçilmediyse işlem yapma.
  */
  if (pendingRemovalProductId === null) {
    return;
  }

  /*
    Seçilen ürünü güncel sepet verisinden buluyoruz.

    Ürün nesnesini ayrıca state'e kopyalamıyoruz.
    Böylece duplicate state oluşturmuyoruz.
  */
  const selectedItem = cart?.cartItems.find(
    (item) =>
      item.productId === pendingRemovalProductId
  );

  if (!selectedItem) {
    toast.error("Kaldırılacak ürün sepette bulunamadı.");
    setPendingRemovalProductId(null);
    return;
  }

  /*
    Aynı ürün için zaten API işlemi devam ediyorsa
    ikinci isteği göndermiyoruz.
  */
  if (updatingProductId === selectedItem.productId) {
    return;
  }

  try {
    setUpdatingProductId(selectedItem.productId);

    await dispatch(
      deleteItemFromCart({
        productId: selectedItem.productId,
        quantity: selectedItem.quantity,
      })
    ).unwrap();

    /*
      Dialog'u kapatıyoruz.
    */
    setPendingRemovalProductId(null);

    toast.success(
      `${selectedItem.name} sepetten kaldırıldı.`
    );
  } catch (error) {
    toast.error(
      getErrorMessage(
        error,
        "Ürün sepetten kaldırılamadı."
      )
    );
  } finally {
    setUpdatingProductId(null);
  }
};

  if (loading && !cart) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const cartItems = cart?.cartItems ?? [];

const pendingRemovalItem =
  pendingRemovalProductId === null
    ? null
    : cartItems.find(
        (item) =>
          item.productId === pendingRemovalProductId
      ) ?? null;

const cartTotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

const shippingPrice = cartTotal >= 5000 ? 0 : 250;

const grandTotal = cartTotal + shippingPrice;

const totalQuantity = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

if (cartItems.length === 0) {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={2}
        sx={{
          p: 6,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <ShoppingCartOutlinedIcon
          sx={{
            fontSize: 80,
            mb: 2,
            color: "text.secondary",
          }}
        />

        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Sepetiniz boş
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Sepetinize henüz bir ürün eklemediniz.
        </Typography>
      </Paper>
    </Container>
  );
}

return (
  <>
    <Container maxWidth="lg" sx={{ mt: 5, mb: 8 }}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", mb: 3 }}
      >
        <ShoppingCartOutlinedIcon fontSize="large" />

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Alışveriş Sepeti
          </Typography>

          <Typography color="text.secondary">
            Sepetinizde toplam {totalQuantity} ürün bulunuyor.
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "minmax(0, 1fr) 360px",
          },
          gap: 3,
          alignItems: "start",
        }}
      >
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "action.hover" }}>
              <TableCell sx={{ fontWeight: 700 }}>
                Ürün
              </TableCell>

              <TableCell sx={{ fontWeight: 700 }}>
                Ürün adı
              </TableCell>

              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Birim fiyat
              </TableCell>

              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Adet
              </TableCell>

              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Toplam
              </TableCell>

              <TableCell align="center" sx={{ fontWeight: 700 }}>
                İşlem
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartItems.map((item) => {
              const isUpdating =
                updatingProductId === item.productId;

              return (
                <TableRow
                  key={item.productId}
                  hover
                  sx={{
                    "&:last-child td": {
                      borderBottom: 0,
                    },
                  }}
                >
                  <TableCell sx={{ width: 110 }}>
                    <Box
                      component="img"
                      src={`http://localhost:5164/images/images/${item.imageUrl}`}
                      alt={item.name}
                      sx={{
                        width: 75,
                        height: 75,
                        objectFit: "contain",
                        borderRadius: 2,
                        p: 1,
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Ürün No: {item.productId}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography sx={{ fontWeight: 500 }}>
                      {formatPrice(item.price)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Tooltip title="Adedi azalt">
                        <span>
                          <IconButton
                            size="small"
                            disabled={isUpdating}
                            onClick={() =>
                              handleDecrease(item.productId)
                            }
                            sx={{
                              border: 1,
                              borderColor: "divider",
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>

                      <Box
                        sx={{
                          minWidth: 42,
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                        }}
                      >
                        {isUpdating ? (
                          <CircularProgress size={18} />
                        ) : (
                          <Typography sx={{ fontWeight: 700 }}>
                            {item.quantity}
                          </Typography>
                        )}
                      </Box>

                      <Tooltip title="Adedi artır">
                        <span>
                          <IconButton
                            size="small"
                            disabled={isUpdating}
                            onClick={() =>
                              handleIncrease(item.productId)
                            }
                            sx={{
                              border: 1,
                              borderColor: "divider",
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Stack>
                  </TableCell>

                  <TableCell align="right">
                    <Typography sx={{ fontWeight: 700 }}>
                      {formatPrice(
                        item.price * item.quantity
                      )}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Sepetten kaldır">
                      <span>
                        <IconButton
                          disabled={isUpdating}
                          onClick={() =>
                            handleOpenRemoveDialog(
                              item.productId
                            )
                          }
                          aria-label={`${item.name} ürününü sepetten kaldır`}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <Divider />

        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
            backgroundColor: "action.hover",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography color="text.secondary">
              Genel toplam
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {formatPrice(cartTotal)}
            </Typography>
          </Box>

          <Box sx={{ textAlign: "right" }}>
            <Typography color="text.secondary">
              Tahmini kargo
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {shippingPrice === 0
                ? "Ücretsiz"
                : formatPrice(shippingPrice)}
            </Typography>
          </Box>
        </Box>
      </TableContainer>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 280,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Sipariş Özeti
        </Typography>

        <Stack spacing={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography color="text.secondary">Ürün toplamı</Typography>
            <Typography>{formatPrice(cartTotal)}</Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography color="text.secondary">Kargo</Typography>
            <Typography>
              {shippingPrice === 0
                ? "Ücretsiz"
                : formatPrice(shippingPrice)}
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Toplam
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {formatPrice(grandTotal)}
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          size="large"
          endIcon={<LockOutlinedIcon />}
          sx={{ mt: 1 }}
        >
          Ödeme Yap
        </Button>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <LocalShippingOutlinedIcon color="action" />
          <Typography variant="body2" color="text.secondary">
            5000 TL ve üzeri siparişlerde kargo ücretsiz.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  </Container>

  <RemoveCartItemDialog
      open={pendingRemovalProductId !== null}
      productName={pendingRemovalItem?.name ?? ""}
      productImageUrl={
        pendingRemovalItem
          ? `http://localhost:5164/images/images/${pendingRemovalItem.imageUrl}`
          : undefined
      }
      loading={
        pendingRemovalItem !== null &&
        updatingProductId === pendingRemovalItem.productId
      }
      onCancel={handleCloseRemoveDialog}
      onConfirm={handleConfirmRemove}
    />
  </>
);
}