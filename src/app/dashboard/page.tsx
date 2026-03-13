"use client"

import Chart, { DataPoint } from '../components/PieChartCard'
import CardRowContainer from '../components/CardRowContainer'
import {CurrentList, HistoryList, Trip, TripStatus } from '../components/TripList'
import { useState, useEffect } from 'react';
import SingleNumberStatisticCard from '../components/dashboard/SingleNumberStatisticCard'
import TableStatisticCard from '../components/dashboard/RecentTripsTableCard';
import RecentTripsTableCard from '../components/dashboard/RecentTripsTableCard';
import RecentExpensesTableCard from '../components/dashboard/RecentExpensesTableCard';
import { getAllTrips } from '@/service/TripService';
import { getAllExpenses } from '@/service/ExpenseService';

const DashboardPage = () => {

  const [totalTrips, setTotalTrips] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesData, setExpensesData] = useState<DataPoint[]>([]); 
  const [tripsData, setTripsData] = useState<Trip[]>([]);

  const [activeTrips, setActiveTrips] = useState(0);
  const [recentlyCompletedTrips, setRecentlyCompletedTrips] = useState(0);
  const [recentlyExpensesTotal, setRecentlyExpensesTotal] = useState(0);
  const [recentlyRevenueTotal, setRecentlyRevenueTotal] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const credentials = btoa("admin:secret"); 
      const headers = {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      };

      getAllTrips().then(trips => {
        setActiveTrips(trips.filter(trip => trip.tripStatus === "INPROGRESS").length);
        setRecentlyCompletedTrips(trips.filter(trip => trip.tripStatus === "COMPLETED").length);
        setRecentlyRevenueTotal(trips.filter(trip => trip.tripStatus === "COMPLETED").reduce((sum, trip) => sum + trip.revenue!, 0));
      });

      getAllExpenses().then(expenses => {
        setRecentlyExpensesTotal(expenses.reduce((sum, expense) => sum + expense.amount, 0))
      })

      // try {
      //   const tripsResponse = await fetch("http://localhost:8080/api/trips", { headers });
      //   if (tripsResponse.ok) {
      //     const trips = await tripsResponse.json();
      //     setTripsData(Array.isArray(trips) ? trips : []);
      //     setTotalTrips(trips.length);
      //   } else {
      //     console.error("Failed to fetch trips:", tripsResponse.status);
      //   }

      //   const expensesResponse = await fetch("http://localhost:8080/api/expenses", { headers });
      //   if (expensesResponse.ok) {
      //     const expenses = await expensesResponse.json();
      //     setExpensesData(expenses);
          
      //     const total = expenses.reduce((sum: number, item: DataPoint) => sum + item.value, 0);
      //     setTotalExpenses(total);
      //   } else {
      //     console.error("Failed to fetch expenses:", expensesResponse.status);
      //   }

      // } catch (error) {
      //   console.error("Error connecting to backend:", error);
      // }
    };

    fetchDashboardData();
  }, []);

  
  return (
    <div className="flex flex-col gap-6 justify-between">
      <CardRowContainer>
        <SingleNumberStatisticCard title={"Active Trips"} data={activeTrips} iconSrc={"/package.svg"}/>
        <SingleNumberStatisticCard title={"Recent Completed Trips"} data={recentlyCompletedTrips} iconSrc={"/package_car.svg"}/>
        <SingleNumberStatisticCard title={"Recent Expenses Total"} data={"PHP " + recentlyExpensesTotal.toLocaleString('en-PH')} iconSrc={"/money.svg"}/>
        <SingleNumberStatisticCard title={"Recent Revenue Total"} data={"PHP " + recentlyRevenueTotal.toLocaleString('en-PH')} iconSrc={"/money.svg"}/>
      </CardRowContainer>
      <CardRowContainer>
        <RecentTripsTableCard title={"Recent Trips"} />
        <RecentExpensesTableCard title={"Recent Expenses"} />
      </CardRowContainer>
    </div>
  )
}

export default DashboardPage