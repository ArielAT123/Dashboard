import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";
import Grid from "@mui/material/Grid";
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Principal */}
        <Paper elevation={8} sx={{
          p: 4,
          mb: 3,
          borderRadius: 6,
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          textAlign: "center"
        }}>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <WbSunnyIcon sx={{ fontSize: 48, color: "#64b5f6" }} />
              <Box>
                <Typography variant="h3" fontWeight="bold">
                  Dashboard del clima
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Pronóstico del tiempo en tiempo real
                </Typography>
              </Box>
            </Box>
            {dataFetcherOutput.data && (
              <Box display="flex" alignItems="center" gap={1} sx={{ mt: 2 }}>
                <LocationOnIcon sx={{ fontSize: 32 }} />
                <Typography variant="h4" fontWeight="bold">
                  {getCityDisplayName(city)}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>

        {/* Alerta debajo del título */}
        <Box sx={{ mb: 3 }}>
          <AlertUI description="🌤️ Condiciones climáticas favorables - No se preveen lluvias" />
        </Box>

        {/* Indicadores principales centrados en horizontal */}
        {dataFetcherOutput.data && (
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={6} sx={{
                  background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                  color: "white",
                  borderRadius: 4
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "rgba(255,255,255,0.3)" }}>
                        <ThermostatIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" fontWeight="bold">
                          {dataFetcherOutput.data.current.temperature_2m}°C
                        </Typography>
                        <Typography variant="body2">
                          Temperatura actual
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={6} sx={{
                  background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
                  color: "white",
                  borderRadius: 4
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "rgba(255,255,255,0.3)" }}>
                        <ThermostatIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" fontWeight="bold">
                          {dataFetcherOutput.data.current.apparent_temperature}°C
                        </Typography>
                        <Typography variant="body2">
                          Sensación térmica
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={6} sx={{
                  background: "linear-gradient(135deg, #42a5f5 0%, #2196f3 100%)",
                  color: "white",
                  borderRadius: 4
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "rgba(255,255,255,0.3)" }}>
                        <AirIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" fontWeight="bold">
                          {dataFetcherOutput.data.current.wind_speed_10m}
                        </Typography>
                        <Typography variant="body2">
                          Viento (km/h)
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Card elevation={6} sx={{
                  background: "linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)",
                  color: "white",
                  borderRadius: 4
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: "rgba(255,255,255,0.3)" }}>
                        <WaterDropIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h4" fontWeight="bold">
                          {dataFetcherOutput.data.current.relative_humidity_2m}%
                        </Typography>
                        <Typography variant="body2">
                          Humedad relativa
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        <Grid container spacing={4} justifyContent="center">
          {/* Selector de ciudad */}
          <Grid item xs={12} md={4}>
            <Paper elevation={6} sx={{
              p: 3,
              borderRadius: 4,
              background: "white",
              height: "fit-content"
            }}>
              <Typography variant="h5" fontWeight="bold" color="black" sx={{ mb: 2, textAlign: "center" }}>
                🌍 Selecciona tu ciudad
              </Typography>
              <SelectorUI city={city} setCity={setCity} />
            </Paper>

            {/* Información adicional */}
            {dataFetcherOutput.data && (
              <Paper elevation={6} sx={{
                p: 3,
                mt: 3,
                borderRadius: 4,
                background: "white"
              }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#0d47a1", textAlign: "center" }}>
                  📊 Información adicional
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" alignItems="center" gap={1} justifyContent="center">
                    <CompressIcon sx={{ color: "#0d47a1" }} />
                    <Typography sx={{ color: "#0d47a1", fontWeight: 500 }}>
                      <strong>Elevación:</strong> {dataFetcherOutput.data.elevation}m
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1} justifyContent="center">
                    <VisibilityIcon sx={{ color: "#0d47a1" }} />
                    <Typography sx={{ color: "#0d47a1", fontWeight: 500 }}>
                      <strong>Zona horaria:</strong> {dataFetcherOutput.data.timezone}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: "#1565c0", textAlign: "center" }}>
                    Última actualización: {new Date().toLocaleTimeString()}
                  </Typography>
                </Box>
              </Paper>
            )}
          </Grid>

          {/* Estados de carga y error */}
          {dataFetcherOutput.error && (
            <Grid item xs={12}>
              <AlertUI description={dataFetcherOutput.error}/>
            </Grid>
          )}
          
          {dataFetcherOutput.loading && (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: "center", background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)" }}>
                <Typography variant="h6" sx={{ color: "#1565c0" }}>🔄 Cargando datos del clima...</Typography>
              </Paper>
            </Grid>
          )}

          {/* Gráficos y Tabla lado a lado */}
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              height: "100%"
            }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#0d47a1", textAlign: "center" }}>
                📈 Gráfico de tendencias
              </Typography>
              <ChartUI city={city} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper elevation={6} sx={{
              p: 3,
              borderRadius: 4,
              background: "linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)",
              height: "100%"
            }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "#0d47a1", textAlign: "center" }}>
                📋 Datos detallados
              </Typography>
              <TableUI city={city} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
