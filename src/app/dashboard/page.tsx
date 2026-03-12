"use client"

import Chart, { DataPoint, ExpenseType } from '../components/Chart'
import Card from '../components/Card'
import Image from 'next/image'
import CardRowContainer from '../components/CardRowContainer'
import {CurrentList, HistoryList, Trip, TripStatus } from '../components/TripList'
import { useState, useEffect } from 'react';

const DashboardPage = () => {

  const [totalTrips, setTotalTrips] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesData, setExpensesData] = useState<DataPoint[]>([]); 
  const [tripsData, setTripsData] = useState<Trip[]>([]); 

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
          setTripsData(Array.isArray(trips) ? trips : []);
          setTotalTrips(trips.length);
        } else {
          console.error("Failed to fetch trips:", tripsResponse.status);
        }

        const expensesResponse = await fetch("http://localhost:8080/api/expenses", { headers });
        if (expensesResponse.ok) {
          const expenses = await expensesResponse.json();
          setExpensesData(expenses);
          
          const total = expenses.reduce((sum: number, item: DataPoint) => sum + item.value, 0);
          setTotalExpenses(total);
        } else {
          console.error("Failed to fetch expenses:", expensesResponse.status);
        }

      } catch (error) {
        console.error("Error connecting to backend:", error);
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