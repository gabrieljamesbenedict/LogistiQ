"use client"

import Card from '../components/Card'
import Image from 'next/image'
import CardRowContainer from '../components/CardRowContainer'
import { useState } from 'react';

const DashboardPage = () => {

  const [totalTrips, setTotalTrips] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [maintenanceOrders, setMaintenanceOrders] = useState(0);


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

{/* <Card title="Total Trips" height={100} width={275}> 
  <div className="flex items-center gap-2 relative h-full">
    <Image src="/package.svg" alt="package" width={24} height={24} />
    <h1 className="text-3xl font-bold">240</h1>
    <div className="absolute bottom-3 right-1 flex gap-1">
      <Image src="/arrow.svg" alt="arrow" width={16} height={16} />
      <span className="text-lg font-semibold">+12%</span>
    </div>
  </div>
</Card>
<Card title="Total Expenses" height={100} width={300}>
  <div className="flex items-center gap-2 relative h-full">
    <Image src="/money.svg" alt="money" width={30} height={30} />
    <h1 className="text-2xl font-bold">P22,400.00</h1>
    <div className="absolute bottom-3 right-1 flex gap-1">
      <Image src="/arrow.svg" alt="arrow" width={16} height={16} />
      <span className="text-lg font-semibold">+12%</span>
    </div>
  </div>
</Card>
<Card title="Maintainance Orders" height={100} width={275}>
  <div className="flex items-center gap-2 relative h-full">
    <Image src="/setting.svg" alt="setting" width={24} height={24} />
    <h1 className="text-3xl font-bold">9</h1>
  </div>
</Card>
<Card title="Active Drivers" height={100} width={275}>
  <div className="flex items-center gap-2 relative h-full">
    <Image src="/package_car.svg" alt="package_car" width={24} height={24} />
    <h1 className="text-3xl font-bold">240</h1>
  </div>
</Card> */}