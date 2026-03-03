import React from 'react'
import List from './List'
import ListItem from './ListItem'

const NavigationBar = () => {
  return (
    <div
        className="min-w-[12vw] bg-card border-r-2 border-card-border flex flex-col justify-between items-center pt-36 pb-12 h-full fixed top-0 left-0"
    >
        <div>
            <List>
                <ListItem>Dashboard</ListItem>
                <ListItem>Trips</ListItem>
                <ListItem>Expenses</ListItem> 
                <ListItem>Analytics</ListItem>
                <ListItem>Drivers</ListItem>
            </List>
        </div>
        <div>
            <List>
                <ListItem>Logout</ListItem>
            </List>
        </div>
    </div>
  )
}

export default NavigationBar