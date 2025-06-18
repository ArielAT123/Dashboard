import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import './App.css';

const elementos = [
  'Encabezado',
  'Alertas',
  'Selector',
  'Indicadores',
  'Gráfico',
  'Tabla',
  'Información adicional'
];

function App() {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="flex-start"
      sx={{ minHeight: '100vh', background: '#f5f6fa', padding: 4 }}
    >
      {elementos.map((nombre, idx) => (
        <Grid id="app-grid" item xs={12} md={6} lg={4} key={idx}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              borderRadius: 3,
              minHeight: 120,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              background: '#fff'
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              {nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Elemento: {nombre}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default App;