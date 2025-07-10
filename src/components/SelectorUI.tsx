import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type SelectorUIProps = {
  onChange: (coords: { lat: string; lon: string }) => void;
};

const cityCoords: Record<string, { lat: number; lon: number }> = {
  guayaquil: { lat: -2.17, lon: -79.92 },
  quito: { lat: -0.18, lon: -78.47 },
  manta: { lat: -0.96, lon: -80.71 },
  cuenca: { lat: -2.90, lon: -79.00 },
};

export default function SelectorUI({ onChange }: SelectorUIProps) {
  const [cityInput, setCityInput] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setCityInput(value);

    if (cityCoords[value]) {
      const { lat, lon } = cityCoords[value];
      onChange({
        lat: lat.toFixed(2),
        lon: lon.toFixed(2),
      });
    } else {
      onChange({ lat: '', lon: '' });
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={cityInput}
        onChange={handleChange}
      >
        <MenuItem disabled value="">
          <em>Seleccione una ciudad</em>
        </MenuItem>
        <MenuItem value="guayaquil">Guayaquil</MenuItem>
        <MenuItem value="quito">Quito</MenuItem>
        <MenuItem value="manta">Manta</MenuItem>
        <MenuItem value="cuenca">Cuenca</MenuItem>
      </Select>
      {cityInput && (
        <p>
          Información del clima en{' '}
          <b>
            {cityInput.charAt(0).toUpperCase() + cityInput.slice(1)}
          </b>
          .
        </p>
      )}
    </FormControl>
  );
}