"use client"

import CardRowContainer from '../components/CardRowContainer'
import { Trip, TripList } from '../components/TripList'
import { useLiveApi } from '../lib/api';

const TripsPage = () => {
  const { data, loading } = useLiveApi<Trip[]>("/trips");

  const tripsData = data || [];

  return (
    <div className="flex flex-col gap-6 justify-between">
      <CardRowContainer>
        <TripList 
          trips={tripsData.filter(t => (t.status as any) === "IN_TRANSIT")} 
        />
        
        <TripList 
          trips={tripsData.filter(t => (t.status as any) === "COMPLETED")} 
        />
      </CardRowContainer>
    </div>
  )
}

export default TripsPage