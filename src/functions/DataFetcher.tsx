import { useState, useEffect } from "react";
import type { OpenMeteoResponse } from "../types/Types";

const DataFetcher = (long: string, lat: string) => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+long+"&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=America%2FChicago";
      
    const fetchData = async () => {
    if(long!=null || lat!=null){
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }
        const result: OpenMeteoResponse = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    };

    fetchData();
  }, [lat,long]);
  

  return { data, loading, error };
};

export default DataFetcher;