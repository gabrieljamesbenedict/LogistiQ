"use client"

import Chart, { DataPoint, ExpenseType } from '../components/Chart'
import Card from '../components/Card'
import Image from 'next/image'
import CardRowContainer from '../components/CardRowContainer'
import {CurrentList, HistoryList, Trip, TripStatus } from '../components/TripList'
import { useState, useEffect } from 'react';

const DashboardPage = () => {

  const dummyExpensesData: DataPoint[] = [ // dummy data
    { name: 'Fuel',          value: 8200,  type: ExpenseType.FUEL },
    { name: 'Maintenance',   value: 3400,  type: ExpenseType.MAINTENANCE },
    { name: 'Miscellaneous', value: 1800,  type: ExpenseType.MISCELLANEOUS },
  ]

  const dummyTripsData: Trip[] = [ // dummy data remove later
    { id: 108284, driver: 'Juan Dela Cruz',  origin: 'Mapua Makati, Pablo Ocampo Sr.', destination: '#148 Rizal Ave., Caloocan', date: '2026-03-10', status: TripStatus.COMPLETED },
    { id: 108291, driver: 'Maria Santos',    origin: 'Taguig, BGC, 9th Ave.',          destination: '#22 Mabini St., Pasay',    date: '2026-03-10', status: TripStatus.IN_TRANSIT },
    { id: 108305, driver: 'Ramon Reyes',     origin: 'QC, Commonwealth Ave.',           destination: '#5 Gen. Luna St., Marikina', date: '2026-03-11', status: TripStatus.PENDING },
    { id: 108312, driver: 'Ana Villanueva',  origin: 'Makati, Ayala Ave.',              destination: '#90 Shaw Blvd., Mandaluyong', date: '2026-03-11', status: TripStatus.ARRIVED },
    { id: 108320, driver: 'Jose Mendoza',    origin: 'Pasig, Ortigas Center',           destination: '#3 Espana Blvd., Sampaloc', date: '2026-03-12', status: TripStatus.COMPLETED },
  ]

  const [totalTrips, setTotalTrips] = useState(dummyTripsData.length);
  const [totalExpenses, setTotalExpenses] = useState(dummyExpensesData.reduce((s, e) => s + e.value, 0));
  const [expensesData, setExpensesData] = useState<DataPoint[]>(dummyExpensesData);
  const [tripsData, setTripsData] = useState<Trip[]>(dummyTripsData);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const credentials = btoa("admin:secret");
      const headers = {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      };

      try {
        const tripsResponse = await fetch("http://localhost:8080/api/trips", { headers });
        if (tripsResponse.ok) {
          const trips = await tripsResponse.json();
          if (trips && trips.length > 0) {
            setTripsData(trips);
            setTotalTrips(trips.length);
          }
        }
      } catch {
        // if backend not running, dummy data show
      }

      try {
        const expensesResponse = await fetch("http://localhost:8080/api/expenses", { headers });
        if (expensesResponse.ok) {
          const expenses = await expensesResponse.json();
          if (expenses && expenses.length > 0) {
            setExpensesData(expenses);
            setTotalExpenses(expenses.reduce((sum: number, item: DataPoint) => sum + item.value, 0));
          }
        }
      } catch {
        // if backend not running, dummy data show
      }
    };

    fetchDashboardData();
  }, []);

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
          <CurrentList trips={tripsData}/>
        </Card>
      </CardRowContainer>
      <CardRowContainer>
        <Card>
          <h2>Trip History</h2>
          <HistoryList trips={tripsData}/>
        </Card>
      </CardRowContainer>
    </div>
  )
}

export default DashboardPage