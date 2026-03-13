const BASE_URL = 'http://localhost:8080/api/trips';

export interface Trip {
  tripId: number;
  tripStatus: string;
  origin: string;
  destination: string;
  startedAt: string;
  endedAt?: string;
  employeeID: number[];
  cargoDescription: string;
  revenue?: number;
}



export const getTrip = (id: number): Promise<Trip> => {
  return fetch(`${BASE_URL}/${id}`, {
    credentials: 'include'
  }).then(res => res.json());
};



export const getAllTrips = (): Promise<Trip[]> => {
  return fetch(`${BASE_URL}`, {
    credentials: 'include'
  }).then(res => res.json());
};



export const createTrip = (trip: Trip): Promise<Trip> => {
  return fetch(`${BASE_URL}`, {
    credentials: 'include',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip)
  }).then(res => res.json());
};



export const updateTrip = (trip: Trip): Promise<Trip> => {
  return fetch(`${BASE_URL}`, {
    credentials: 'include',
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip)
  }).then(res => res.json());
};



export const deleteTrip = (trip: Trip): Promise<void> => {
  return fetch(`${BASE_URL}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trip)
  }).then(res => {
    if (!res.ok) throw new Error('Failed to delete trip');
  });
};