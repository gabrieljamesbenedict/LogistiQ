import React from 'react'
import Card from './Card';
import Image from 'next/image'
import { Trip } from './TripList';

export interface Route {
  id: number;
  stops: Stops[];
}

interface Stops{
  id: number;
  place: string;
  placeDesc: string;
  time: Date;
  price: number;
}

type RouteListProps = {
  trip?: Trip;
}

export const RouteList= (props: RouteListProps) => {
  return (
    <ul className="text-xl flex flex-col p-4">
      <Card>
        <h2>{props.trip?.driver}</h2>
        {props?.trip?.route?.stops.map((stop) => (
          <li key={stop.id} className="items-center text-primary">
            <div className="p-4 flex justify-between">
              <div className="flex flex-col flex-1 justify-between">
                <h1 className="text-2xl font-bold">{stop.place}</h1>
                <h1 className="text-xl text-accent">{stop.placeDesc}</h1>
                <h2>₱{stop.price}</h2>
              </div>
              <h2>{new Date(stop.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
            </div>
          </li>
        ))}

        <div className="text-xl flex justify-between flex-row bg-gray-200 rounded-[20px]">
          <div className='flex flex-col p-5'>
            <div className="flex flex-col p-3">
              <h1 className='text-expand'>Driver Name</h1>
              <h1>{props.trip?.driver}</h1>
            </div>
            <div className="flex flex-col p-3">
              <h1 className='text-expand'>Status</h1>
              <h1>{props.trip?.status}</h1>
            </div>
          </div>
          <div className='flex flex-col p-5'>
            <div className="flex flex-col p-3">
              <h1 className='text-expand'>Total Expenses</h1>
              <h1>{props.trip?.totalExpenses}</h1>
            </div>
            <div className="flex flex-col p-3">
              <h1 className='text-expand'>Customer Name</h1>
              <h1>{props.trip?.customerName}</h1>
            </div>
          </div>
        </div>
      </Card>
    </ul>
      
  );
};
