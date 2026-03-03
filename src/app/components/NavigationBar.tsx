'use client'

import { usePathname } from 'next/navigation'
import List from './List'
import ListItem from './ListItem'
import LogoutButton from './LogoutButton'

const NavigationBar = () => {
    const pathname = usePathname()

    return (
        <div className="min-w-[12vw] bg-card border-r-2 border-card-border flex flex-col justify-between items-center pt-26 pb-8 h-full fixed top-0 left-0">
                <div>
                        <List>
                                <ListItem href="/dashboard" isActive={pathname === '/dashboard'}>Dashboard</ListItem>
                                <ListItem href="/trips" isActive={pathname === '/trips'}>Trips</ListItem>
                                <ListItem href="/expenses" isActive={pathname === '/expenses'}>Expenses</ListItem>
                                <ListItem href="/analytics" isActive={pathname === '/analytics'}>Analytics</ListItem>
                                <ListItem href="/drivers" isActive={pathname === '/drivers'}>Drivers</ListItem>
                        </List>
                </div>
                <LogoutButton />
        </div>
    )
}

export default NavigationBar