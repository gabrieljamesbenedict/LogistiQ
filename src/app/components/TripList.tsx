import React from 'react'
import Card from './Card';
import Image from 'next/image'
import { Route } from './RouteList';

export interface Trip {
  id: number;
  driver: string;
  origin: string;
  destination: string;
  route?: Route;
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

export const HistoryList = ({ trips }: { trips: Trip[] }) => {
  return (
    <div className="text-xl">
      <ul className="flex flex-col divide-y divide-card-border">
        <li className="grid grid-cols-[0.3fr_1fr_1fr_1fr_1fr_1fr_1fr] font-semibold p-4 items-center text-center text-expand">
          <span>ID</span>
          <span>Driver</span>
          <span>Date</span>
          <span>Status</span>
          <span>Expenses</span>
          <span>Profit</span>
          <span>Customer</span>
        </li>
        {trips.map((trip) => (
          <li key={trip.id} className="grid grid-cols-[0.3fr_1fr_1fr_1fr_1fr_1fr_1fr] p-4 items-center text-center text-primary">
            <span>{trip.id}</span>
            <span>{trip.driver}</span>
            <span>{formatDate(trip.date)}</span>
            <span>{trip.status}</span>
            <span>{trip.totalExpenses}</span>
            <span>{trip.totalProfit}</span>
            <span>{trip.customerName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const TripList = ({ trips }: { trips: Trip[] }) => {
  return (
    <div className="text-xl">
      <ul className="flex flex-col">
        {trips.map((trip) => (
          <li key={trip.id} className="p-4 items-center text-primary">
            <Card>
              <div className="p-4 flex justify-between">
                <div className="flex flex-col flex-1 justify-between">
                  <h1 className="text-3xl font-bold">#{trip.id}</h1>
                  <h2>{trip.status}</h2>
                  <h2>{trip.driver}</h2>
                </div>
                <div className='flex flex-row'>
                  <Image src="/tripDesign.svg" alt="tripDesign" width={40} height={40} />
                    <div className="flex flex-col">
                        <h2 className='text-base'>Pickup</h2>
                      <h2>{trip.origin}</h2>
                    <div className="flex-1" />
                        <h2 className='text-base'>Dropoff</h2>
                      <h2>{trip.destination}</h2>
                    </div>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

const formatDate = (date: Date) =>
  date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
});
