"use client"

import CardRowContainer from '../components/CardRowContainer'
import { Trip, TripList } from '../components/TripList'
import { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api'; 

const TripsPage = () => {

  const [tripsData, setTripsData] = useState<Trip[]>([]);

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await apiFetch("/trips");
        setTripsData(data);
      } catch (error) {
        console.error("Error loading trips:", error);
      }
    };

    loadTrips();
  }, []);
  
  return (
    <div className="flex flex-col gap-6 justify-between">
      <CardRowContainer>
        <TripList trips={tripsData} />
        <TripList trips={tripsData} />
      </CardRowContainer>
    </div>
  )
}

export default TripsPage