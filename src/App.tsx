import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";
import Grid from "@mui/material/Grid";
import SelectorUI from "./components/SelectorUI";
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import IndicatorUI from "./components/IndicatorUI";
import { useState } from "react";
import DataFetcher from "./functions/DataFetcher";

const queryClient = new QueryClient();

function App() {
  const [coords, setCoords] = useState<{ lat: string; lon: string }>({ lat: '-1.83', lon: '-78.18' });
  const dataFetcherOutput = DataFetcher(coords.lat, coords.lon);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Grid
                container
                spacing={2}
                sx={{
                  backgroundColor: '#FFFFFF',
                  minHeight: '100vh',
                  padding: { xs: 2, sm: 3, md: 4 },
                  margin: 0,
                }}
              >
                {/* Header */}
                <Grid
                  size={{ xs: 12, md: 12 }}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <HeaderUI />
                </Grid>

                {/* Alertas */}
                <Grid
                  size={{ xs: 12, md: 12 }}
                  container
                  justifyContent="right"
                  alignItems="center"
                  sx={{
                    backgroundColor: '#E3F2FD',
                    borderRadius: 2,
                    padding: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#BBDEFB',
                      transform: 'scale(1.01)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <AlertUI description="No se preveen lluvias" />
                </Grid>

                {/* Selector */}
                <Grid
                  size={{ xs: 12, sm: 6, md: 3 }}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div style={{ color: '#1976D2', fontWeight: 600, marginBottom: 8 }}>
                    Selecciona una ciudad
                  </div>
                  <SelectorUI onChange={setCoords} />
                </Grid>

                {/* Indicadores */}
                <Grid
                  container
                  size={{ xs: 12, sm: 6, md: 9 }}
                  spacing={2}
                  sx={{ display: 'flex', alignItems: 'stretch' }}
                >
                  {dataFetcherOutput.loading && (
                    <Grid size={12}>
                      <div
                        style={{
                          color: '#1976D2',
                          textAlign: 'center',
                          padding: 16,
                          backgroundColor: '#E3F2FD',
                          borderRadius: 8,
                        }}
                      >
                        Cargando datos...
                      </div>
                    </Grid>
                  )}
                  {dataFetcherOutput.error && (
                    <Grid size={12}>
                      <div
                        style={{
                          color: '#D32F2F',
                          textAlign: 'center',
                          padding: 16,
                          backgroundColor: '#FFEBEE',
                          borderRadius: 8,
                        }}
                      >
                        {dataFetcherOutput.error}
                      </div>
                    </Grid>
                  )}
                  {dataFetcherOutput.data && (
                    <>
                      <Grid
                        size={{ xs: 12, sm: 6, md: 3 }}
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <IndicatorUI
                          title="Temperatura (2m)"
                          description={`${dataFetcherOutput.data.current.temperature_2m}°C`}
                        />
                      </Grid>
                      <Grid
                        size={{ xs: 12, sm: 6, md: 3 }}
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <IndicatorUI
                          title="Temperatura aparente"
                          description={`${dataFetcherOutput.data.current.apparent_temperature}°C`}
                        />
                      </Grid>
                      <Grid
                        size={{ xs: 12, sm: 6, md: 3 }}
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <IndicatorUI
                          title="Velocidad del viento"
                          description={`${dataFetcherOutput.data.current.wind_speed_10m} km/h`}
                        />
                      </Grid>
                      <Grid
                        size={{ xs: 12, sm: 6, md: 3 }}
                        sx={{
                          height: '100%',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <IndicatorUI
                          title="Humedad relativa"
                          description={`${dataFetcherOutput.data.current.relative_humidity_2m}%`}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                {/* Chart */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <ChartUI lat={coords.lat} lon={coords.lon} />
                </Grid>

                {/* Table */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <TableUI lat={coords.lat} lon={coords.lon} />
                </Grid>
              </Grid>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;