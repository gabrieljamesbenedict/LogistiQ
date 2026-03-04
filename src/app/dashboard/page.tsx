"use client"

import Chart, { DataPoint, ExpenseType } from '../components/Chart'
import Card from '../components/Card'
import Image from 'next/image'
import CardRowContainer from '../components/CardRowContainer'
import {CurrentList, Trip, TripStatus } from '../components/TripList'
import { useState } from 'react';

const DashboardPage = () => {

  const [totalTrips, setTotalTrips] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const [expensesData, setExpensesData] = useState<DataPoint[]>([ //dummy data, replace with api call
    { name: ExpenseType.MISC, value: 30 },
    { name: ExpenseType.MAINTENANCE, value: 45 },
    { name: ExpenseType.TOLLS, value: 45 },
    { name: ExpenseType.SALARY, value: 28 },
    { name: ExpenseType.FUEL, value: 28 },
  ]);

  const [tripsData, setTripsData] = useState<Trip[]>([ //dummy data, replace with api call
    { id: 1, date: new Date("2024-01-15T08:30:00"), origin: "Manila", destination: "Cebu", status: TripStatus.IN_TRANSIT, driver: "Juan Dela Cruz" },
    { id: 2, date: new Date("2024-01-16T10:00:00"), origin: "Davao", destination: "Baguio", status: TripStatus.COMPLETED, driver: "Maria Santos" },
    { id: 3, date: new Date("2024-01-17T14:45:00"), origin: "Iloilo", destination: "Zamboanga", status: TripStatus.ARRIVED, driver: "Pedro Reyes" },
    { id: 4, date: new Date("2024-01-18T09:15:00"), origin: "Quezon City", destination: "Tacloban", status: TripStatus.IN_TRANSIT, driver: "Ana Garcia" },
    { id: 5, date: new Date("2024-01-19T11:30:00"), origin: "Batangas", destination: "Legazpi", status: TripStatus.PENDING, driver: "Carlos Mendoza" },
    { id: 6, date: new Date("2024-01-20T07:00:00"), origin: "Clark", destination: "General Santos", status: TripStatus.COMPLETED, driver: "Rosa Villanueva" },
  ]);
  
  return (
    <div className="flex flex-col gap-6 justify-between">

      <CardRowContainer>
        <Card>
          <h2>Total Trips</h2>
          <div className="flex gap-2">
            <Image src="/package.svg" alt="package" width={24} height={24} />
            <h1 className="text-3xl font-bold">{totalTrips}</h1>
          </div>
        </Card>
        <Card>
          <h2>Total Expenses</h2>
          <div className="flex gap-2">
            <Image src="/money.svg" alt="money" width={30} height={30} />
            <h1 className="text-3xl font-bold">{totalExpenses}</h1>
          </div>
        </Card>
      </CardRowContainer>

      <CardRowContainer>
        <Card>
          <h2>Expenses Chart</h2>
          <Chart data={expensesData} />
        </Card>
        <Card>
          <div className="flex justify-between">
            <h2>Current Trips</h2>
            <h2 className="text-expand">See all</h2>
          </div>
          <CurrentList trips={tripsData}>
          </CurrentList>
        </Card>
      </CardRowContainer>
      <CardRowContainer>
        <Card>
          <div style={{ minHeight: '1000px' }}>
            <h2>Trip History</h2>
          </div>
        </Card>
      </CardRowContainer>

    </div>
  )
}

export default DashboardPage
