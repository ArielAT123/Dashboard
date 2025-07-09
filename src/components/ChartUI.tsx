import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type{ OpenMeteoResponse } from '../types/Types';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-1.25&longitude=-78.25&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago';

async function fetchWeather(): Promise<OpenMeteoResponse> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener datos');
  return res.json();
}

export default function ChartUI() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeather,
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error al cargar datos</Alert>;

  const arrLabels = data?.hourly.time.slice(0, 50) ?? [];
  const arrValues1 = data?.hourly.temperature_2m.slice(0, 50) ?? [];
  const arrValues2 = data?.hourly.wind_speed_10m.slice(0, 50) ?? [];

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura y viento (primeras 7 horas)
      </Typography>
      <LineChart
        height={300}
        series={[
          { data: arrValues1, label: 'Temperatura (°C)' },
          { data: arrValues2, label: 'Viento (km/h)' },
        ]}
        xAxis={[{ scaleType: 'point', data: arrLabels }]}
      />
    </>
  );
}