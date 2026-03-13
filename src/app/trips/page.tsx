"use client"

import { useState } from 'react';
import CardRowContainer from '../components/CardRowContainer'
import { Route, RouteList } from '../components/RouteList';
import { Trip, TripList, TripStatus } from '../components/TripList'
import { useLiveApi } from '../lib/api';

const TripsPage = () => {
  const { data, loading } = useLiveApi<Trip[]>("/trips");

  const tripsData = data || [];
  const trip = tripsData.at(0);

  const baseDate = new Date();

  // Drivers in current DB dont have route,
const tripPlaceholder: Trip = {
  id: 1,
  driver: "Juan Dela Cruz",
  origin: "Manila",
  destination: "Quezon City",
  date: baseDate,
  status: TripStatus.IN_TRANSIT,
  customerName: "Maria Santos",
  totalExpenses: 500,
  totalProfit: 200,
  route: {
    id: 101,
    stops: [
      {
        id: 1,
        place: "Manila",
        placeDesc: "Pickup at Manila",
        time: new Date(baseDate),
        price: 0,
      },
      {
        id: 2,
        place: "Makati",
        placeDesc: "Stopover at Makati",
        time: new Date(baseDate.getTime() + 1 * 60 * 60 * 1000), // +1 hour
        price: 50,
      },
      {
        id: 3,
        place: "Cebu City",
        placeDesc: "Dropoff at Cebu City",
        time: new Date(baseDate.getTime() + 2 * 60 * 60 * 1000), // +2 hours
        price: 100,
      },
    ],
  },
};

  return (
    <div className="flex flex-col gap-6 justify-between">
      <CardRowContainer>
        <TripList 
          trips={tripsData}
        />
        {/* <RouteList route={trip?.route} /> */}
        <RouteList trip={tripPlaceholder} />
      </CardRowContainer>
    </div>
  )
}

export default TripsPage