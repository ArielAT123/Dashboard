import { useState, useEffect } from "react";
import type { OpenMeteoResponse } from "../types/Types";

const cityCoords: Record<string, { lat: number; lon: number }> = {
  guayaquil: { lat: -2.1962, lon: -79.8862 },
  quito: { lat: -0.2298, lon: -78.525 },
  manta: { lat: -0.9494, lon: -80.7314 },
  cuenca: { lat: -2.9005, lon: -79.0045 },
};

export async function fetchWeatherByCoords(
  lat: number,
  lon: number
): Promise<OpenMeteoResponse> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener datos");
  return res.json();
}

export async function fetchWeatherByCity(city: string): Promise<OpenMeteoResponse> {
  const coords = cityCoords[city] || cityCoords["quito"];
  return fetchWeatherByCoords(coords.lat, coords.lon);
}

const DataFetcher = (city: string) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchWeatherByCity(city)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  return { data, loading, error };
};

export default DataFetcher;