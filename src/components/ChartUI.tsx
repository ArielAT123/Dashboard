import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { OpenMeteoResponse } from '../types/Types';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherByCity } from '../functions/DataFetcher';

interface ChartUIProps {
  city: string;
}

export default function ChartUI({ city }: ChartUIProps) {
  const { data, isLoading, error } = useQuery<OpenMeteoResponse>({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherByCity(city),
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