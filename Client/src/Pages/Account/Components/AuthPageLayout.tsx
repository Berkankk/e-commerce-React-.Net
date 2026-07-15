import type { ReactNode } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

interface AuthPageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthPageLayout({
  title,
  subtitle,
  children,
}: AuthPageLayoutProps) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 64px)",
        display: "grid",

        /*
          Masaüstü:
          Sol alan yaklaşık %52
          Sağ alan yaklaşık %48

          Mobil:
          Sadece form gösterilecek.
        */
        gridTemplateColumns: {
          xs: "1fr",
          md: "minmax(0, 52fr) minmax(460px, 48fr)",
        },
        bgcolor: "common.white",
      }}
    >
      {/* SOL TANITIM PANELİ */}
      <Box
        component="section"
        sx={{
          position: "relative",
          display: {
            xs: "none",
            md: "flex",
          },
          minHeight: "calc(100vh - 64px)",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          color: "common.white",
          px: {
            md: 7,
            lg: 10,
            xl: 14,
          },
          py: 7,
          background: `
            radial-gradient(
              circle at 35% 35%,
              rgba(37, 99, 235, 0.14),
              transparent 42%
            ),
            linear-gradient(
              145deg,
              #071126 0%,
              #0d1a3a 48%,
              #14285a 100%
            )
          `,
        }}
      >
        {/* Sağ üst dekoratif daire */}
        <Box
          sx={{
            position: "absolute",
            width: {
              md: 330,
              xl: 450,
            },
            height: {
              md: 330,
              xl: 450,
            },
            right: {
              md: -160,
              xl: -220,
            },
            top: {
              md: -170,
              xl: -230,
            },
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.055)",
          }}
        />

        {/* Sol alt dekoratif daire */}
        <Box
          sx={{
            position: "absolute",
            width: {
              md: 400,
              xl: 540,
            },
            height: {
              md: 400,
              xl: 540,
            },
            left: {
              md: -250,
              xl: -330,
            },
            bottom: {
              md: -260,
              xl: -350,
            },
            borderRadius: "50%",
            bgcolor: "rgba(59,130,246,0.11)",
          }}
        />

        {/* Sol panelin merkez içeriği */}
        <Stack
          spacing={{
            md: 4,
            xl: 4.5,
          }}
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: 740,
          }}
        >
          {/* Roket */}
          <Box
            sx={{
              width: {
                md: 140,
                xl: 168,
              },
              height: {
                md: 140,
                xl: 168,
              },
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 28px 80px rgba(0,0,0,0.22)",
            }}
          >
            <RocketLaunchOutlinedIcon
              sx={{
                fontSize: {
                  md: 78,
                  xl: 96,
                },
                color: "#60a5fa",
                transform: "rotate(-9deg)",
              }}
            />
          </Box>

          {/* Başlık ve açıklama */}
          <Box>
            <Typography
              component="p"
              sx={{
                maxWidth: 720,
                fontSize: {
                  md: "2.75rem",
                  lg: "3.2rem",
                  xl: "3.65rem",
                },
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.04em",
                mb: 2.5,
              }}
            >
              Alışveriş deneyimini
              <br />
              bir üst seviyeye taşı.
            </Typography>

            <Typography
              sx={{
                maxWidth: 660,
                color: "rgba(255,255,255,0.74)",
                fontSize: {
                  md: "1rem",
                  xl: "1.1rem",
                },
                lineHeight: 1.85,
              }}
            >
              Güvenli ödeme, hızlı teslimat ve kolay sipariş
              yönetimiyle modern bir alışveriş deneyimi yaşa.
            </Typography>
          </Box>

          {/* Özellik kutuları */}
          <Stack
            direction="row"
            spacing={1.5}
            flexWrap="wrap"
            useFlexGap
            pt={1}
          >
            <FeatureItem
              icon={<VerifiedUserOutlinedIcon />}
              text="Güvenli hesap"
            />

            <FeatureItem
              icon={<LocalShippingOutlinedIcon />}
              text="Sipariş takibi"
            />

            <FeatureItem
              icon={<CreditCardOutlinedIcon />}
              text="Güvenli ödeme"
            />
          </Stack>
        </Stack>
      </Box>

      {/* SAĞ FORM PANELİ */}
      <Box
        component="section"
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: {
            xs: "#f8fafc",
            md: "#ffffff",
          },
          px: {
            xs: 2,
            sm: 4,
            md: 6,
            lg: 8,
          },
          py: {
            xs: 4,
            md: 5,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 520,
            p: {
              xs: 3,
              sm: 4,
              lg: 4.5,
            },
            borderRadius: 4,
            bgcolor: "background.paper",
            border: "1px solid rgba(15,23,42,0.07)",
            boxShadow: "0 22px 65px rgba(15,23,42,0.11)",
          }}
        >
          {/* Marka */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            mb={3}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                borderRadius: 2.5,
                color: "primary.main",
                bgcolor: "rgba(25,118,210,0.07)",
                border: "1px solid rgba(25,118,210,0.18)",
              }}
            >
              <ShoppingBagOutlinedIcon />
            </Box>

            <Typography
              component="span"
              variant="h6"
              fontWeight={800}
              color="text.primary"
            >
              E-Commerce App
            </Typography>
          </Stack>

          {/* Sayfa başlığı */}
          <Box mb={3}>
            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  sm: "2.25rem",
                },
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "text.primary",
                mb: 1,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              lineHeight={1.7}
            >
              {subtitle}
            </Typography>
          </Box>

          {children}
        </Paper>
      </Box>
    </Box>
  );
}

interface FeatureItemProps {
  icon: ReactNode;
  text: string;
}

function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        px: 1.75,
        py: 1.1,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.065)",
        border: "1px solid rgba(255,255,255,0.11)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          color: "#60a5fa",

          "& svg": {
            fontSize: 21,
          },
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="body2"
        fontWeight={700}
        color="rgba(255,255,255,0.91)"
        whiteSpace="nowrap"
      >
        {text}
      </Typography>
    </Stack>
  );
}