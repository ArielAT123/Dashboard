import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useQuery } from '@tanstack/react-query';
import type { OpenMeteoResponse } from '../types/Types';

interface ChartUIProps {
  lat: string;
  lon: string;
}

async function fetchWeather(lat: string, lon: string): Promise<OpenMeteoResponse> {
  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m¤t=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago`;
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener datos');
  return res.json();
}

export default function ChartUI({ lat, lon }: ChartUIProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', lat, lon], // Clave dinámica basada en lat y lon
    queryFn: () => fetchWeather(lat, lon),
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error al cargar datos</Alert>;

  const arrLabels = data?.hourly.time.slice(-25) ?? [];
  const arrValues1 = data?.hourly.temperature_2m.slice(-25) ?? [];
  const arrValues2 = data?.hourly.wind_speed_10m.slice(-25) ?? [];

  return (
    <>
      <Typography variant="h5" component="div">
        Temperatura y viento (últimas 24 horas)
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