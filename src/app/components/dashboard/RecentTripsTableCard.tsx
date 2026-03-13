"use client"

import React, { useEffect, useState } from 'react'
import Card from '../Card'
import Chart from '../PieChartCard'
import { getAllTrips, Trip } from '@/service/TripService'

const RecentTripsTableCard = ({title}: any) => {

  const [recentTripList, setRecentTripList] = useState<Trip[]>([]);

  useEffect(() => {

    getAllTrips().then(result => setRecentTripList(result.slice(0, 10)));
    
  },[]);
  
  return (
    <Card>
      <h2 className="font-semibold text-xl mb-2">{title}</h2>

      <ul className="flex flex-col divide-y divide-card-border min-h-75">

        {/* Header */}
        <li className="grid grid-cols-[1fr_2fr_1fr] font-semibold p-4 text-center text-expand">
          <span>Trip ID</span>
          <span>Cargo</span>
          <span>Status</span>
        </li>

        {/* Rows */}
        {recentTripList.map((trip) => (
          <li
            key={trip.tripId}
            className="grid grid-cols-[1fr_2fr_1fr] p-4 items-center text-center text-primary hover:bg-card-hover transition"
          >
            <span>{trip.tripId}</span>
            <span>{trip.cargoDescription}</span>
            <span>{trip.tripStatus}</span>
          </li>
        ))}

      </ul>
    </Card>
  )
}

export default RecentTripsTableCard

// export interface Trip {
//   tripId: number;
//   tripStatus: string;
//   origin: string;
//   destination: string;
//   startedAt: string;
//   endedAt?: string;
//   employeeID: number[];
//   cargoDescription: string;
//   revenue?: number;
// }