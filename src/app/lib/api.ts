const BASE_URL = "http://localhost:8080/api";

const credentials = btoa("admin:secret");

export const apiHeaders = {
  "Authorization": `Basic ${credentials}`,
  "Content-Type": "application/json",
};

/**
 * Helper to fetch from your Spring Boot API
 * Usage: const data = await apiFetch("/trips");
 */
export async function apiFetch(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: apiHeaders,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} at ${endpoint}`);
  }

  return response.json();
}