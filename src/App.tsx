import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";
import SelectorUI from "./components/SelectorUI";
import dataFetcher from './functions/DataFetcher';
import AlertUI from "./components/AlertUI";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { CssBaseline, Typography, Card, CardContent, Avatar } from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function App() {
  const [city, setCity] = useState("quito");
  const dataFetcherOutput = dataFetcher(city);

  const getCityDisplayName = (cityKey: string) => {
    const cities: { [key: string]: string } = {
      guayaquil: "Guayaquil",
      quito: "Quito", 
      manta: "Manta",
      cuenca: "Cuenca"
    };
    return cities[cityKey] || cityKey;
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* Header Principal */}
        <Paper 
          elevation={12} 
          sx={{
            p: { xs: 3, sm: 4, md: 6 },
            mb: 6,
            borderRadius: 12,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0%, transparent 60%)",
              pointerEvents: "none"
            },
            "&::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              right: "-20%",
              width: "40%",
              height: "200%",
              background: "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
              transform: "rotate(45deg)",
              pointerEvents: "none"
            }
          }}
        >
          <Box 
            display="flex" 
            alignItems="center" 
            justifyContent="center" 
            flexDirection="column" 
            gap={3}
            position="relative"
            zIndex={1}
          >
            <Box display="flex" alignItems="center" gap={3} flexWrap="wrap" justifyContent="center">
              <WbSunnyIcon sx={{ 
                fontSize: { xs: 40, sm: 48, md: 56 }, 
                color: "#ffeb3b",
                filter: "drop-shadow(0 4px 8px rgba(255,235,59,0.3))",
                animation: "pulse 2s infinite"
              }} />
              <Box textAlign={{ xs: "center", sm: "left" }}>
                <Typography 
                  variant="h2" 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                    textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.02em"
                  }}
                >
                  Dashboard del clima
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    opacity: 0.95,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                    mt: 1,
                    fontWeight: 300,
                    letterSpacing: "0.5px"
                  }}
                >
                  Pronóstico del tiempo en tiempo real
                </Typography>
              </Box>
            </Box>
            
            {dataFetcherOutput.data && (
              <Box 
                display="flex" 
                alignItems="center" 
                gap={2} 
                sx={{ 
                  mt: 3,
                  p: 3,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}
              >
                <LocationOnIcon sx={{ 
                  fontSize: { xs: 28, sm: 32 }, 
                  color: "#ffeb3b",
                  filter: "drop-shadow(0 2px 4px rgba(255,235,59,0.3))"
                }} />
                <Typography 
                  variant="h4" 
                  fontWeight="bold"
                  sx={{ 
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
                    letterSpacing: "-0.01em"
                  }}
                >
                  {getCityDisplayName(city)}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Alerta */}
        <Box sx={{ mb: 5 }}>
          <AlertUI description="🌤️ Condiciones climáticas favorables - No se preveen lluvias" />
        </Box>

        {/* Indicadores principales */}
        {dataFetcherOutput.data && (
          <Box sx={{ mb: 6 }}>
            <Box 
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)"
                },
                gap: 4,
                justifyItems: "center"
              }}
            >
              <Card 
                elevation={12} 
                sx={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: 8,
                  width: "100%",
                  maxWidth: 320,
                  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s"
                  },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(102,126,234,0.4)",
                    "&::before": {
                      transform: "translateX(100%)"
                    }
                  }
                }}
              >
                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Avatar sx={{ 
                      bgcolor: "rgba(255,255,255,0.2)", 
                      width: 64, 
                      height: 64,
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(255,255,255,0.3)"
                    }}>
                      <ThermostatIcon sx={{ fontSize: 32, color: "#ffeb3b" }} />
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h3" 
                        fontWeight="bold"
                        sx={{ 
                          fontSize: { xs: "2rem", sm: "2.5rem" },
                          lineHeight: 1.2,
                          textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}
                      >
                        {dataFetcherOutput.data.current.temperature_2m}°C
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          opacity: 0.95,
                          fontSize: "1rem",
                          mt: 0.5,
                          fontWeight: 300
                        }}
                      >
                        Temperatura actual
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card 
                elevation={12} 
                sx={{
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                  borderRadius: 8,
                  width: "100%",
                  maxWidth: 320,
                  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s"
                  },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(240,147,251,0.4)",
                    "&::before": {
                      transform: "translateX(100%)"
                    }
                  }
                }}
              >
                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Avatar sx={{ 
                      bgcolor: "rgba(255,255,255,0.2)", 
                      width: 64, 
                      height: 64,
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(255,255,255,0.3)"
                    }}>
                      <ThermostatIcon sx={{ fontSize: 32, color: "#ffeb3b" }} />
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h3" 
                        fontWeight="bold"
                        sx={{ 
                          fontSize: { xs: "2rem", sm: "2.5rem" },
                          lineHeight: 1.2,
                          textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}
                      >
                        {dataFetcherOutput.data.current.apparent_temperature}°C
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          opacity: 0.95,
                          fontSize: "1rem",
                          mt: 0.5,
                          fontWeight: 300
                        }}
                      >
                        Sensación térmica
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card 
                elevation={12} 
                sx={{
                  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "white",
                  borderRadius: 8,
                  width: "100%",
                  maxWidth: 320,
                  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s"
                  },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(79,172,254,0.4)",
                    "&::before": {
                      transform: "translateX(100%)"
                    }
                  }
                }}
              >
                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Avatar sx={{ 
                      bgcolor: "rgba(255,255,255,0.2)", 
                      width: 64, 
                      height: 64,
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(255,255,255,0.3)"
                    }}>
                      <AirIcon sx={{ fontSize: 32, color: "#e1f5fe" }} />
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h3" 
                        fontWeight="bold"
                        sx={{ 
                          fontSize: { xs: "2rem", sm: "2.5rem" },
                          lineHeight: 1.2,
                          textShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}
                      >
                        {dataFetcherOutput.data.current.wind_speed_10m}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          opacity: 0.95,
                          fontSize: "1rem",
                          mt: 0.5,
                          fontWeight: 300
                        }}
                      >
                        Viento (km/h)
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card 
                elevation={12} 
                sx={{
                  background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                  color: "#2c3e50",
                  borderRadius: 8,
                  width: "100%",
                  maxWidth: 320,
                  transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.6s"
                  },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 20px 40px rgba(168,237,234,0.4)",
                    "&::before": {
                      transform: "translateX(100%)"
                    }
                  }
                }}
              >
                <CardContent sx={{ p: 4, position: "relative", zIndex: 1 }}>
                  <Box display="flex" alignItems="center" gap={3}>
                    <Avatar sx={{ 
                      bgcolor: "rgba(44,62,80,0.1)", 
                      width: 64, 
                      height: 64,
                      backdropFilter: "blur(10px)",
                      border: "2px solid rgba(44,62,80,0.2)"
                    }}>
                      <WaterDropIcon sx={{ fontSize: 32, color: "#3498db" }} />
                    </Avatar>
                    <Box>
                      <Typography 
                        variant="h3" 
                        fontWeight="bold"
                        sx={{ 
                          fontSize: { xs: "2rem", sm: "2.5rem" },
                          lineHeight: 1.2,
                          textShadow: "0 2px 4px rgba(44,62,80,0.1)"
                        }}
                      >
                        {dataFetcherOutput.data.current.relative_humidity_2m}%
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          opacity: 0.9,
                          fontSize: "1rem",
                          mt: 0.5,
                          fontWeight: 400,
                          color: "#34495e"
                        }}
                      >
                        Humedad relativa
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {/* Selector y información adicional */}
        <Box 
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            mb: 6
          }}
        >
          <Paper 
            elevation={12} 
            sx={{
              p: 4,
              borderRadius: 12,
              background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
              height: "100%",
              border: "1px solid rgba(252,182,159,0.3)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                right: "-50%",
                width: "100%",
                height: "100%",
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                pointerEvents: "none"
              }
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="bold" 
              color="#d35400" 
              sx={{ 
                mb: 3, 
                textAlign: "center",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                textShadow: "0 2px 4px rgba(211,84,0,0.1)",
                position: "relative",
                zIndex: 1
              }}
            >
              🌍 Selecciona tu ciudad
            </Typography>
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <SelectorUI city={city} setCity={setCity} />
            </Box>
          </Paper>

          {dataFetcherOutput.data && (
            <Paper 
              elevation={12} 
              sx={{
                p: 4,
                borderRadius: 12,
                background: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)",
                height: "100%",
                border: "1px solid rgba(210,153,194,0.3)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                  pointerEvents: "none"
                }
              }}
            >
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                sx={{ 
                  mb: 3, 
                  color: "#8e44ad", 
                  textAlign: "center",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  textShadow: "0 2px 4px rgba(142,68,173,0.1)",
                  position: "relative",
                  zIndex: 1
                }}
              >
                📊 Información adicional
              </Typography>
              <Box display="flex" flexDirection="column" gap={3} position="relative" zIndex={1}>
                <Box 
                  display="flex" 
                  alignItems="center" 
                  gap={2} 
                  justifyContent="center"
                  sx={{
                    p: 3,
                    borderRadius: 8,
                    background: "rgba(142,68,173,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(142,68,173,0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(142,68,173,0.15)",
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  <CompressIcon sx={{ color: "#8e44ad", fontSize: 28 }} />
                  <Typography sx={{ color: "#8e44ad", fontWeight: 600, fontSize: "1.1rem" }}>
                    <strong>Elevación:</strong> {dataFetcherOutput.data.elevation}m
                  </Typography>
                </Box>
                <Box 
                  display="flex" 
                  alignItems="center" 
                  gap={2} 
                  justifyContent="center"
                  sx={{
                    p: 3,
                    borderRadius: 8,
                    background: "rgba(142,68,173,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(142,68,173,0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "rgba(142,68,173,0.15)",
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  <VisibilityIcon sx={{ color: "#8e44ad", fontSize: 28 }} />
                  <Typography sx={{ color: "#8e44ad", fontWeight: 600, fontSize: "1.1rem" }}>
                    <strong>Zona horaria:</strong> {dataFetcherOutput.data.timezone}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: "#9b59b6", 
                    textAlign: "center",
                    mt: 2,
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    opacity: 0.8
                  }}
                >
                  Última actualización: {new Date().toLocaleTimeString()}
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>

        {/* Estados de carga y error */}
        {dataFetcherOutput.error && (
          <Box sx={{ mb: 4 }}>
            <AlertUI description={dataFetcherOutput.error}/>
          </Box>
        )}
        
        {dataFetcherOutput.loading && (
          <Paper 
            sx={{ 
              p: 6, 
              textAlign: "center", 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 12,
              mb: 4,
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                animation: "shimmer 2s infinite"
              }
            }}
          >
            <Typography variant="h6" sx={{ 
              color: "white", 
              fontSize: "1.25rem",
              position: "relative",
              zIndex: 1,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)"
            }}>
              🔄 Cargando datos del clima...
            </Typography>
          </Paper>
        )}

        {/* Gráficos y Tabla */}
        <Box 
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 4
          }}
        >
          <Paper 
            elevation={12} 
            sx={{
              p: 4,
              borderRadius: 12,
              background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
              height: "100%",
              minHeight: 450,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                right: "-50%",
                width: "100%",
                height: "100%",
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                pointerEvents: "none"
              }
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="bold" 
              sx={{ 
                mb: 3, 
                color: "#1565c0", 
                textAlign: "center",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                textShadow: "0 2px 4px rgba(21,101,192,0.2)",
                position: "relative",
                zIndex: 1
              }}
            >
              📈 Gráfico de tendencias
            </Typography>
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <ChartUI city={city} />
            </Box>
          </Paper>
        
          <Paper 
            elevation={12} 
            sx={{
              p: 4,
              borderRadius: 12,
              background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
              height: "100%",
              minHeight: 450,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "100%",
                height: "100%",
                background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                pointerEvents: "none"
              }
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="bold" 
              sx={{ 
                mb: 3, 
                color: "#d35400", 
                textAlign: "center",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                textShadow: "0 2px 4px rgba(211,84,0,0.2)",
                position: "relative",
                zIndex: 1
              }}
            >
              📋 Datos detallados
            </Typography>
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <TableUI city={city} />
            </Box>
          </Paper>
        </Box>
      </Container>

    </>
  );
}

export default App;