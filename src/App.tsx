import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";
import Grid from "@mui/material/Grid";
import SelectorUI from "./components/SelectorUI";
import dataFetcher from './functions/DataFetcher';
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import IndicatorUI from "./components/IndicatorUI";
import { useState } from "react";
const queryClient = new QueryClient();

function App() {
  const [coords, setCoords] = useState<{ lat: string; lon: string }>({ lat: '-1.83', lon: '-78.18' });
  const dataFetcherOutput = dataFetcher(coords.lat, coords.lon);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

                {/* Alertas */}
                <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
                  <AlertUI description="No se preveen lluvias"/>
                </Grid>

                {/* Selector */}
                <Grid size={{ xs: 12, md: 3 }}>Elemento: Selector
                  <SelectorUI onChange={setCoords} />
                </Grid>

                {/* Indicadores */}
                <Grid container size={{ xs: 12, md: 9 }}>
                  {dataFetcherOutput.loading && (
                    <Grid size={12}>
                      <div>Cargando datos...</div>
                    </Grid>
                  )}
                  {dataFetcherOutput.error && (
                    <Grid size={12}>
                      <div style={{ color: 'red' }}>{dataFetcherOutput.error}</div>
                    </Grid>
                  )}
                  {dataFetcherOutput.data && (
                    <>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                          title='Temperatura (2m)'
                          description={`${dataFetcherOutput.data.current.temperature_2m}°C`}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                          title='Temperatura aparente'
                          description={`${dataFetcherOutput.data.current.apparent_temperature}°C`}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                          title='Velocidad del viento'
                          description={`${dataFetcherOutput.data.current.wind_speed_10m} km/h`}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 3 }}>
                        <IndicatorUI
                          title='Humedad relativa'
                          description={`${dataFetcherOutput.data.current.relative_humidity_2m}%`}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid item xs={6} md={6} sx={{ display: { xs: "none", md: "block" } }}>
                  <ChartUI />
                </Grid>
                <Grid item xs={6} md={6} sx={{ display: { xs: "none", md: "block" } }}>
                  <TableUI />
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