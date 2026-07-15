import { useState } from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  Link as RouterLink,
  useNavigate,
} from "react-router";

import { toast } from "react-toastify";

import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import requests from "../../api/requests";

import {
  useAppDispatch,
} from "../../Hooks/hooks";

import type {
  LoginDto,
} from "../../Model/Account/LoginDto";

import {
  setUser,
} from "./AccountSlice";

import AuthPageLayout from "./Components/AuthPageLayout";

const initialValues: LoginDto = {
  userName: "",
  password: "",
};

export default function LoginPage() {
  const navigate = useNavigate();

  /*
    Redux action göndermek için dispatch oluşturuyoruz.
  */
  const dispatch = useAppDispatch();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginDto>({
    defaultValues: initialValues,
    mode: "onTouched",
  });

  const onSubmit = async (
    loginDto: LoginDto
  ) => {
    try {
      /*
        Kullanıcı bilgilerini backend'e gönderiyoruz.
      */
      const user =
        await requests.Account.login(
          loginDto
        );

      /*
        Kullanıcıyı Redux'a kaydediyoruz.

        AccountSlice içerisindeki setUser:
        - Redux state'ini doldurur.
        - localStorage'a kullanıcıyı kaydeder.
      */
      dispatch(setUser(user));

      toast.success(
        `${user.userName}, hoş geldiniz.`
      );

      /*
        Giriş başarılı olunca ana sayfaya gönder.
      */
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Login işlemi başarısız:",
        error
      );
    }
  };

  return (
    <AuthPageLayout
      title="Hoş geldiniz"
      subtitle="Hesabınıza giriş yaparak alışverişinize kaldığınız yerden devam edin."
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2.5}>
          <Alert
            severity="info"
            icon={
              <InfoOutlinedIcon fontSize="inherit" />
            }
            sx={{
              borderRadius: 2.5,
              bgcolor: "#e7f5ff",
              color: "#0f4c75",
              alignItems: "center",

              "& .MuiAlert-icon": {
                color: "primary.main",
              },
            }}
          >
            Kullanıcı adınızı ve şifrenizi
            girerek oturum açın.
          </Alert>

          <Controller
            name="userName"
            control={control}
            rules={{
              required:
                "Kullanıcı adı zorunludur.",

              minLength: {
                value: 3,
                message:
                  "Kullanıcı adı en az 3 karakter olmalıdır.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                autoFocus
                size="medium"
                label="Kullanıcı adı"
                placeholder="Kullanıcı adınızı girin"
                autoComplete="username"
                error={Boolean(
                  errors.userName
                )}
                helperText={
                  errors.userName?.message
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required:
                "Şifre zorunludur.",

              minLength: {
                value: 6,
                message:
                  "Şifre en az 6 karakter olmalıdır.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="medium"
                label="Şifre"
                placeholder="Şifrenizi girin"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                error={Boolean(
                  errors.password
                )}
                helperText={
                  errors.password?.message
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon color="action" />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="button"
                          edge="end"
                          aria-label={
                            showPassword
                              ? "Şifreyi gizle"
                              : "Şifreyi göster"
                          }
                          onClick={() =>
                            setShowPassword(
                              (current) =>
                                !current
                            )
                          }
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: -0.5,
            }}
          >
            <Link
              component="button"
              type="button"
              underline="hover"
              variant="body2"
              fontWeight={700}
              onClick={() => {
                toast.info(
                  "Şifre yenileme özelliği henüz aktif değil."
                );
              }}
            >
              Şifremi unuttum
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            disabled={isSubmitting}
            startIcon={
              <LoginOutlinedIcon />
            }
            sx={{
              minHeight: 54,
              borderRadius: 2.5,
              fontSize: "1rem",
              fontWeight: 700,
              textTransform: "none",

              boxShadow:
                "0 12px 28px rgba(25,118,210,0.24)",

              "&:hover": {
                boxShadow:
                  "0 15px 34px rgba(25,118,210,0.31)",
              },
            }}
          >
            {isSubmitting
              ? "Giriş yapılıyor..."
              : "Giriş yap"}
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
          >
            Henüz hesabınız yok mu?{" "}

            <Link
              component={RouterLink}
              to="/register"
              underline="hover"
              fontWeight={700}
            >
              Hesap oluşturun
            </Link>
          </Typography>
        </Stack>
      </Box>
    </AuthPageLayout>
  );
}