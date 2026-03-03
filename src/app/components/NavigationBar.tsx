import React from 'react'
import List from './List'

const NavigationBar = () => {
  return (
    <div
        className="min-w-[15vw] bg-card border-r-2 border-card-border flex flex-col justify-between items-center pt-12"
    >
        <div>
            <List>
                <li>Dashboard</li>
                <li>Trips</li>
                <li>Expenses</li>
                <li>Analytics</li>
                <li>Drivers</li>
            </List>
        </div>
        <div>
            <li>Logout</li>
        </div>
    </div>
  )
}

export default NavigationBar