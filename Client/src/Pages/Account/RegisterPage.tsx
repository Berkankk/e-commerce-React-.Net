import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import requests from "../../api/requests";
import type { RegisterDto } from "../../Model/Account/RegisterDto";
import AuthPageLayout from "./Components/AuthPageLayout";

const initialValues: RegisterDto = {
  name: "",
  userName: "",
  email: "",
  password: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterDto>({
    defaultValues: initialValues,
    mode: "onTouched",
  });

  const onSubmit = async (
    registerDto: RegisterDto
  ) => {
    try {
      const user =
        await requests.Account.register(
          registerDto
        );

      toast.success(
        `${user.userName} kullanıcısı başarıyla oluşturuldu.`
      );

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      /*
        API hata mesajları requests.ts içindeki
        Axios interceptor tarafından gösteriliyor.

        Burada tekrar toast göstermek,
        aynı hatanın iki kere çıkmasına neden olur.
      */
      console.error(
        "Register işlemi başarısız:",
        error
      );
    }
  };

  return (
    <AuthPageLayout title="Hesap oluşturun">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={2.25}>
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
            Bilgilerinizi doldurarak yeni hesabınızı oluşturun.
          </Alert>

          <Controller
            name="name"
            control={control}
            rules={{
              required: "Ad soyad zorunludur.",
              minLength: {
                value: 2,
                message:
                  "Ad soyad en az 2 karakter olmalıdır.",
              },
              maxLength: {
                value: 100,
                message:
                  "Ad soyad en fazla 100 karakter olabilir.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                autoFocus
                size="medium"
                label="Ad soyad"
                placeholder="Adınızı ve soyadınızı girin"
                autoComplete="name"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />

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
              maxLength: {
                value: 30,
                message:
                  "Kullanıcı adı en fazla 30 karakter olabilir.",
              },
              pattern: {
                value: /^[a-zA-Z0-9._-]+$/,
                message:
                  "Kullanıcı adı yalnızca harf, rakam, nokta, alt çizgi ve tire içerebilir.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="medium"
                label="Kullanıcı adı"
                placeholder="Kullanıcı adınızı belirleyin"
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
            name="email"
            control={control}
            rules={{
              required:
                "E-posta adresi zorunludur.",
              pattern: {
                value:
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message:
                  "Geçerli bir e-posta adresi girin.",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="medium"
                label="E-posta adresi"
                placeholder="ornek@email.com"
                type="email"
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={
                  errors.email?.message
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon color="action" />
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
              required: "Şifre zorunludur.",
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
                placeholder="Güçlü bir şifre oluşturun"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                error={Boolean(
                  errors.password
                )}
                helperText={
                  errors.password?.message ??
                  "En az 6 karakterden oluşan bir şifre belirleyin."
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

          <Button
            fullWidth
            type="submit"
            size="large"
            variant="contained"
            disabled={isSubmitting}
            startIcon={
              <PersonAddAltOutlinedIcon />
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
              ? "Hesap oluşturuluyor..."
              : "Hesap oluştur"}
          </Button>

          <Typography
            variant="body2"
            textAlign="center"
            color="text.secondary"
          >
            Zaten hesabınız var mı?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              fontWeight={700}
            >
              Giriş yapın
            </Link>
          </Typography>
        </Stack>
      </Box>
    </AuthPageLayout>
  );
}