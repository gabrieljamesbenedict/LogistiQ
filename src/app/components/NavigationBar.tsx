import React from 'react'
import List from './List'
import ListItem from './ListItem'
import LogoutButton from './LogoutButton'

const NavigationBar = () => {
  return (
    <div className="min-w-[12vw] bg-card border-r-2 border-card-border flex flex-col justify-between items-center pt-26 pb-8 h-full fixed top-0 left-0">
        <div>
            <List>
                <ListItem href="/dashboard">Dashboard</ListItem>
                <ListItem href="/trips">Trips</ListItem>
                <ListItem href="/expenses">Expenses</ListItem>
                <ListItem href="/analytics">Analytics</ListItem>
                <ListItem href="/drivers">Drivers</ListItem>
            </List>
        </div>
        <LogoutButton />
    </div>
  )
}

export default NavigationBar