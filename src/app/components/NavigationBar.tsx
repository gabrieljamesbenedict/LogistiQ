'use client'

import { usePathname } from 'next/navigation'
import List from './List'
import ListItem from './ListItem'
import LogoutButton from './LogoutButton'
import Link from 'next/link'

const NavigationBar = () => {
    const pathname = usePathname()

    return (
	<div className="min-w-[12vw] bg-card border-r-2 border-card-border flex flex-col justify-between items-center pt-26 pb-8 h-full fixed top-0 left-0">
		<div>
			<List>
				<ListItem isActive={pathname === '/dashboard'}><Link href="/dashboard" className="block">Dashboard</Link></ListItem>
				<ListItem isActive={pathname === '/trips'}><Link href="/trips" className="block">Trips</Link></ListItem>
				<ListItem isActive={pathname === '/expenses'}><Link href="/expenses" className="block">Expenses</Link></ListItem>
				<ListItem isActive={pathname === '/analytics'}><Link href="/analytics" className="block">Analytics</Link></ListItem>
				<ListItem isActive={pathname === '/drivers'}><Link href="/drivers" className="block">Drivers</Link></ListItem>
			</List>
		</div>
		<div>
			<List>
				<ListItem><Link href="/login">Logout</Link></ListItem>
			</List>
		</div>
	</div>
    )
}

export default NavigationBar