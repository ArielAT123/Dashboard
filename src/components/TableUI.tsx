import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useQuery } from '@tanstack/react-query';
import type { OpenMeteoResponse } from '../types/Types';
import Box from '@mui/material/Box';

interface TableUIProps {
  lat: string;
  lon: string;
}

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

async function fetchWeather(lat: string, lon: string): Promise<OpenMeteoResponse> {
  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago`;
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener datos');
  return res.json();
}

export default function TableUI({ lat, lon }: TableUIProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', lat, lon], // Clave dinámica basada en lat y lon
    queryFn: () => fetchWeather(lat, lon),
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error al cargar datos</Alert>;

  const arrLabels = data?.hourly.time.slice(0, 7) ?? [];
  const arrValues1 = data?.hourly.temperature_2m.slice(0, 7) ?? [];
  const arrValues2 = data?.hourly.wind_speed_10m.slice(0, 7) ?? [];

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