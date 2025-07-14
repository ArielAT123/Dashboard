import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import type { OpenMeteoResponse } from '../types/Types';
import { fetchWeatherByCity } from '../functions/DataFetcher';
import { useEffect, useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'label', headerName: 'Hora', width: 180 },
  { field: 'value1', headerName: 'Temperatura (°C)', width: 180 },
  { field: 'value2', headerName: 'Viento (km/h)', width: 180 },
  {
    field: 'resumen',
    headerName: 'Resumen',
    description: 'No es posible ordenar u ocultar esta columna.',
    sortable: false,
    hideable: false,
    width: 220,
    valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
  },
];

interface TableUIProps {
  city: string;
}

export default function TableUI({ city }: TableUIProps) {
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

  const rows = arrLabels.map((label, index) => ({
    id: index,
    label,
    value1: arrValues1[index],
    value2: arrValues2[index],
  }));

  return (
    <Box sx={{ height: 350, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}