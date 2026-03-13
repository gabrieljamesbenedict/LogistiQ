"use client"

import Chart, { DataPoint } from '../components/PieChartCard'
import CardRowContainer from '../components/CardRowContainer'
import {CurrentList, HistoryList, Trip, TripStatus } from '../components/TripList'
import { useState, useEffect } from 'react';
import SingleNumberStatisticCard from '../components/dashboard/SingleNumberStatisticCard'
import TableStatisticCard from '../components/dashboard/RecentTripsTableCard';
import RecentTripsTableCard from '../components/dashboard/RecentTripsTableCard';
import RecentExpensesTableCard from '../components/dashboard/RecentExpensesTableCard';

const DashboardPage = () => {

  const [totalTrips, setTotalTrips] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesData, setExpensesData] = useState<DataPoint[]>([]); 
  const [tripsData, setTripsData] = useState<Trip[]>([]); 

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     const credentials = btoa("admin:secret"); 
  //     const headers = {
  //       "Authorization": `Basic ${credentials}`,
  //       "Content-Type": "application/json"
  //     };

  //     try {
  //       const tripsResponse = await fetch("http://localhost:8080/api/trips", { headers });
  //       if (tripsResponse.ok) {
  //         const trips = await tripsResponse.json();
  //         setTripsData(Array.isArray(trips) ? trips : []);
  //         setTotalTrips(trips.length);
  //       } else {
  //         console.error("Failed to fetch trips:", tripsResponse.status);
  //       }

  //       const expensesResponse = await fetch("http://localhost:8080/api/expenses", { headers });
  //       if (expensesResponse.ok) {
  //         const expenses = await expensesResponse.json();
  //         setExpensesData(expenses);
          
  //         const total = expenses.reduce((sum: number, item: DataPoint) => sum + item.value, 0);
  //         setTotalExpenses(total);
  //       } else {
  //         console.error("Failed to fetch expenses:", expensesResponse.status);
  //       }

  //     } catch (error) {
  //       console.error("Error connecting to backend:", error);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  return (
    <div className="flex flex-col gap-6 justify-between">
      <CardRowContainer>
        <SingleNumberStatisticCard title={"Active Trips"} data={0} iconSrc={"/package.svg"}/>
        <SingleNumberStatisticCard title={"Recent Completed Trips"} data={0} iconSrc={"/package_car.svg"}/>
        <SingleNumberStatisticCard title={"Recent Expenses Total"} data={0} iconSrc={"/money.svg"}/>
        <SingleNumberStatisticCard title={"Recent Revenue Total"} data={0} iconSrc={"/money.svg"}/>
      </CardRowContainer>
      <CardRowContainer>
        <RecentTripsTableCard title={"Recent Trips"} />
        <RecentExpensesTableCard title={"Recent Expenses"} />
      </CardRowContainer>
      <CardRowContainer>
        <RecentTripsTableCard title={"Recent Trips"} />
        <RecentExpensesTableCard title={"Recent Expenses"} />
      </CardRowContainer>
    </div>
  )
}

export default DashboardPage