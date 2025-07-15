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

  const cached = getCachedWeather(city);
  if (cached) {
    return Promise.resolve(cached); // usar cache válido
  }

  try {
    const data = await fetchWeatherByCoords(coords.lat, coords.lon);
    setCachedWeather(city, data);
    return data;
  } catch (err) {
    // En caso de fallo, devolver cache expirado si hay
    const fallback = localStorage.getItem(`weather-${city}`);
    if (fallback) {
      try {
        const parsed = JSON.parse(fallback);
        return parsed.data as OpenMeteoResponse;
      } catch {
        throw err; // no se puede usar el respaldo
      }
    }
    throw err; // no hay datos válidos
  }
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

const CACHE_DURATION_MINUTES = 10;

function getCachedWeather(city: string): OpenMeteoResponse | null {
  const cached = localStorage.getItem(`weather-${city}`);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    const timestamp = parsed.timestamp;
    const now = Date.now();
    const diff = (now - timestamp) / (1000 * 60); // minutos

    if (diff < CACHE_DURATION_MINUTES) {
      return parsed.data as OpenMeteoResponse;
    }

    return null; // datos expirados
  } catch {
    return null; // error al parsear
  }
}

function setCachedWeather(city: string, data: OpenMeteoResponse) {
  const cache = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(`weather-${city}`, JSON.stringify(cache));
}
export default DataFetcher;