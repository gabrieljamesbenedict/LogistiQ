"use client"

import Chart, { DataPoint, ExpenseType } from '../components/Chart'
import Card from '../components/Card'
import Image from 'next/image'
import CardRowContainer from '../components/CardRowContainer'
import { useState } from 'react';

const DashboardPage = () => {

  const [totalTrips, setTotalTrips] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [maintenanceOrders, setMaintenanceOrders] = useState(0);

  const [expensesData, setExpensesData] = useState<DataPoint[]>([ //dummy data, replace with api call
    { name: ExpenseType.MISC, value: 30 },
    { name: ExpenseType.MAINTENANCE, value: 45 },
    { name: ExpenseType.TOLLS, value: 45 },
    { name: ExpenseType.SALARY, value: 28 },
    { name: ExpenseType.FUEL, value: 28 },
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
        <Card>
          <h2>Maintenance Orders</h2>
          <div className="flex gap-2">
            <Image src="/setting.svg" alt="money" width={30} height={30} />
            <h1 className="text-3xl font-bold">{maintenanceOrders}</h1>
          </div>
        </Card>
      </CardRowContainer>

      <CardRowContainer>
        <Card>
          <h2>Expenses Chart</h2>
          <Chart data={expensesData} />
        </Card>
        <Card>
          <h2>Current Trips</h2>
        </Card>
        <Card>
          <h2>Maintenance Orders</h2>
        </Card> 
      </CardRowContainer>

    </div>
  )
}

export default DashboardPage
