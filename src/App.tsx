import TableUI from "./components/TableUI";
import ChartUI from "./components/ChartUI";
import Grid from "@mui/material/Grid";
import SelectorUI from "./components/SelectorUI";
import dataFetcher from './functions/DataFetcher';
import HeaderUI from "./components/HeaderUI";
import AlertUI from "./components/AlertUI";
import IndicatorUI from "./components/IndicatorUI";
import { useState } from "react";


function App() {
  const [city, setCity] = useState("quito"); // Valor por defecto

  // Pasa la ciudad seleccionada a dataFetcher
  const dataFetcherOutput = dataFetcher(city);

  return (
   
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

      {/* Alertas */}
      <Grid size={{ xs: 12, md: 12 }} container justifyContent="right" alignItems="center">
        <AlertUI description="No se preveen lluvias"/>
      </Grid>

      {/* Selector */}
      <Grid size={{ xs: 12, md: 3 }}>
        <SelectorUI city={city} setCity={setCity} />
      </Grid>

      {/* Indicadores */}
      <Grid container size={{ xs: 12, md: 9 }}>
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
                  <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
        <ChartUI city={city} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
        <TableUI city={city} />
      </Grid>
    </Grid>
                </Grid>
              
           
         
  );
}

export default App;
