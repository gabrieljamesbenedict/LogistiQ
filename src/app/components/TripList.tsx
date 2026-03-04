import React from 'react'

export interface Trip {
  id: number;
  driver: string;
  origin: string;
  destination: string;
  date: Date;
  status: TripStatus;
  customerName?: string;
  totalExpenses?: number;
  totalProfit?: number;
}

export enum TripStatus{
  IN_TRANSIT = 'In Transit',
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  ARRIVED = 'Arrived'
}

const colors: Record<TripStatus, string> = {
  [TripStatus.IN_TRANSIT]: 'bg-[#FFEC75]',
  [TripStatus.PENDING]: 'bg-[#FFBF75]',
  [TripStatus.ARRIVED]: 'bg-[#83EEFF]',
  [TripStatus.COMPLETED]: 'bg-success',
};

export const CurrentList = ({trips}: { trips: Trip[] }) => {
  return (
    <ul className="flex flex-col text-xl divide-y divide-card-border text-primary">
      {trips.filter((trip) => trip.status !== TripStatus.COMPLETED).slice(-4).map((trip) => {
        return (
          <li key={trip.id} className="p-4 flex gap-4 items-center">
            <div className="whitespace-nowrap pr-2">
              <h2 className='text-expand'>Trip #{trip.id}</h2>
            </div>
            <div className="w-full">
              <div className='flex justify-between'>
                <h2>{trip.destination}</h2>
                <h2 className={`px-2 rounded-full min-w-[110px] text-center ${colors[trip.status]}`}>
                  {trip.status}
                </h2>
              </div>
              <div className='flex justify-between'>
                <h2 className='text-expand'>{trip.driver}</h2>
                <h2>{formatDate(trip.date)}</h2>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  )
}

export const HistoryList = ({trips}: { trips: Trip[] }) => {
  return (
    <ul className="flex flex-col text-xl divide-y divide-card-border">
      {trips.slice(-4).map((trip) => (
        <li key={trip.id} className="p-4 flex gap-4 items-center">
          <div className="whitespace-nowrap pr-2">
              <h2>Trip #{trip.id}</h2>
          </div>
          <div className="w-full">
            <div className='flex justify-between'>
              <h2>{trip.destination}</h2>
              <h2>{trip.status}</h2>
            </div>
            <div className='flex justify-between'>
              <h2>{trip.driver}</h2>
              <h2>{formatDate(trip.date)}</h2>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

const formatDate = (date: Date) =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
});
