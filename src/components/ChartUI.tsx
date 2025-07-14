import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { OpenMeteoResponse } from '../types/Types';
import { fetchWeatherByCity } from '../functions/DataFetcher';
import { useEffect, useState } from 'react';

interface ChartUIProps {
  city: string;
}

export default function ChartUI({ city }: ChartUIProps) {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchWeatherByCity(city)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Error al cargar datos');
        setIsLoading(false);
      });
  }, [city]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

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