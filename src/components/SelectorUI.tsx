import type { Dispatch, SetStateAction } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface SelectorUIProps {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}

export default function SelectorUI({ city, setCity }: SelectorUIProps) {
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCity(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label">Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={city}
        onChange={handleChange}
      >
        <MenuItem disabled value=""><em>Seleccione una ciudad</em></MenuItem>
        <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
        <MenuItem value={"quito"}>Quito</MenuItem>
        <MenuItem value={"manta"}>Manta</MenuItem>
        <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>
      {city && (
        <p>
          Información del clima en{' '}
          <b>
            {city.charAt(0).toUpperCase() + city.slice(1)}
          </b>
          .
        </p>
      )}
    </FormControl>
  );
}