import React from 'react'
import Card from './Card';
import Image from 'next/image'

export interface Route {
  id: number
  stops: Stops[];
  driver: string;
}

interface Stops{
  place: string;
  placeDesc: string;
  time: Date;
  price: number;
}


export const RouteShow= ({ trips }: { trips: Trip[] }) => {
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