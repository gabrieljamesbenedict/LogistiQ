'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import List from './List'
import ListItem from './ListItem'
import Link from 'next/link'

const NavigationBar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const [showLogout, setShowLogout] = useState(false)

    return (
	<>
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
				<ListItem>
					<button onClick={() => setShowLogout(true)} className="block w-full text-left cursor-pointer">
						Logout
					</button>
				</ListItem>
			</List>
		</div>
	</div>

	{/* Logout confirmation */}
	{showLogout && (
		<div
			className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
			onClick={() => setShowLogout(false)}
		>
			<div
				className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4 w-80"
				onClick={e => e.stopPropagation()}
			>
				<h2 className="text-xl font-semibold text-primary">Log Out</h2>
				<p className="text-expand">Are you sure you want to log out?</p>
				<div className="flex gap-3 justify-end mt-2">
					<button
						onClick={() => setShowLogout(false)}
						className="px-5 py-2 border border-card-border rounded-lg text-primary hover:bg-background cursor-pointer"
					>
						Cancel
					</button>
					<button
						onClick={() => { setShowLogout(false); router.push('/login') }}
						className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg cursor-pointer"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	)}
	</>
    )
}

export default NavigationBar