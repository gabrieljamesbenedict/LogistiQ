import { useState, useEffect } from 'react';

const BASE_URL = "http://localhost:8080/api";
const credentials = btoa("admin:secret");

export const apiHeaders = {
  "Authorization": `Basic ${credentials}`,
  "Content-Type": "application/json",
};

export async function apiFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: apiHeaders,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} at ${endpoint}`);
  }

  return response.json();
}

export function useLiveApi<T>(endpoint: string, intervalMs: number = 5000) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiFetch(endpoint);
        setData(result);
      } catch (err) {
        console.error(`Live fetch failed for ${endpoint}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData()
    
    const timer = setInterval(fetchData, intervalMs);

    return () => clearInterval(timer)
  }, [endpoint, intervalMs]);

  return { data, loading };
}