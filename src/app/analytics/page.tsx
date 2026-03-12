'use client'

import { useState } from 'react'
import Card from '../components/Card'
import CardRowContainer from '../components/CardRowContainer'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts'

const tabs = ['Trip Reports', 'Expense Report', 'Vehicle Stats', 'Driver Performance', 'Financial Summary']
const PIE_COLORS = ['#1E3A5F', '#4A90D9', '#A8C8F0', '#7DB6FB', '#457DC2']

// fall back dummy data, remove later

const tripHistory = [
  { tripNumber: '1038', driver: 'John Doe',      vehicle: 'Truck A', date: '09/12/26', status: 'Completed',  route: 'Manila → Makati',          distanceKm: 13 },
  { tripNumber: '1039', driver: 'Maria Santos',  vehicle: 'Truck B', date: '09/13/26', status: 'Completed',  route: 'Quezon City → Pasig',       distanceKm: 18 },
  { tripNumber: '1040', driver: 'John Doe',      vehicle: 'Truck A', date: '09/14/26', status: 'Pending',    route: 'Makati → BGC',              distanceKm: 7  },
  { tripNumber: '1041', driver: 'Pedro Reyes',   vehicle: 'Truck C', date: '09/15/26', status: 'Completed',  route: 'Manila → Parañaque',        distanceKm: 22 },
  { tripNumber: '1042', driver: 'Maria Santos',  vehicle: 'Truck B', date: '09/16/26', status: 'In Transit', route: 'Pasig → Taguig',            distanceKm: 15 },
]

const expenseRows = [
  { tripNumber: '1038', driver: 'John Doe',     date: '09/12/26', status: 'Approved', totalExpense: 1230, type: 'Fuel'          },
  { tripNumber: '1038', driver: 'John Doe',     date: '09/12/26', status: 'Approved', totalExpense: 500,  type: 'Tolls'         },
  { tripNumber: '1039', driver: 'Maria Santos', date: '09/13/26', status: 'Pending',  totalExpense: 850,  type: 'Maintenance'   },
  { tripNumber: '1040', driver: 'John Doe',     date: '09/14/26', status: 'Rejected', totalExpense: 2100, type: 'Miscellaneous' },
  { tripNumber: '1041', driver: 'Pedro Reyes',  date: '09/15/26', status: 'Approved', totalExpense: 960,  type: 'Fuel'          },
]

const vehicleRows = [
  { vehicle: 'Truck A', driver: 'John Doe',     date: '09/12/26', status: 'Active',   tripNumber: '1038', route: 'Manila → Makati',    distanceKm: 13 },
  { vehicle: 'Truck B', driver: 'Maria Santos', date: '09/13/26', status: 'Active',   tripNumber: '1039', route: 'Quezon City → Pasig', distanceKm: 18 },
  { vehicle: 'Truck C', driver: 'Pedro Reyes',  date: '09/15/26', status: 'Inactive', tripNumber: '1041', route: 'Manila → Parañaque',  distanceKm: 22 },
  { vehicle: 'Truck A', driver: 'John Doe',     date: '09/16/26', status: 'Active',   tripNumber: '1042', route: 'Makati → BGC',        distanceKm: 7  },
]

const driverPerfRows = [
  { driver: 'John Doe',      date: '09/12/26', totalTrips: 12, completed: 9, inTransit: 2, avgDistanceKm: 13 },
  { driver: 'Maria Santos',  date: '09/13/26', totalTrips: 8,  completed: 6, inTransit: 1, avgDistanceKm: 16 },
  { driver: 'Pedro Reyes',   date: '09/15/26', totalTrips: 15, completed: 12, inTransit: 2, avgDistanceKm: 22 },
  { driver: 'Harvey Specter',date: '09/16/26', totalTrips: 5,  completed: 3, inTransit: 1, avgDistanceKm: 18 },
]

const financialRows = [
  { tripNumber: '1038', driver: 'John Doe',     date: '09/12/26', revenue: 5000, expenses: 1730, profit: 3270 },
  { tripNumber: '1039', driver: 'Maria Santos', date: '09/13/26', revenue: 4200, expenses: 850,  profit: 3350 },
  { tripNumber: '1040', driver: 'John Doe',     date: '09/14/26', revenue: 3800, expenses: 2100, profit: 1700 },
  { tripNumber: '1041', driver: 'Pedro Reyes',  date: '09/15/26', revenue: 6000, expenses: 960,  profit: 5040 },
  { tripNumber: '1042', driver: 'Maria Santos', date: '09/16/26', revenue: 4500, expenses: 1500, profit: 3000 },
]

// Aggregated chart data (dummy only REPLACE w API)
const trendData      = [{ month:'Aug',trips:160},{month:'Sept',trips:185},{month:'Oct',trips:260},{month:'Nov',trips:265},{month:'Dec',trips:225},{month:'Jan',trips:295},{month:'Feb',trips:330}]
const expTrendData   = [{ month:'Aug',amount:8000},{month:'Sept',amount:12000},{month:'Oct',amount:9500},{month:'Nov',amount:14000},{month:'Dec',amount:11000},{month:'Jan',amount:16000},{month:'Feb',amount:13500}]
const vehUtilData    = [{ month:'Aug',usage:160},{month:'Sept',usage:185},{month:'Oct',usage:260},{month:'Nov',usage:265},{month:'Dec',usage:225},{month:'Jan',usage:295},{month:'Feb',usage:330}]
const finTrendData   = [{ month:'Aug',revenue:20000,expenses:8000},{month:'Sept',revenue:24000,expenses:12000},{month:'Oct',revenue:28000,expenses:9500},{month:'Nov',revenue:22000,expenses:14000},{month:'Dec',revenue:30000,expenses:11000},{month:'Jan',revenue:32000,expenses:16000},{month:'Feb',revenue:35000,expenses:13500}]
const expByType      = [{ name:'Fuel',value:45},{name:'Maintenance',value:20},{name:'Tolls',value:15},{name:'Salary',value:15},{name:'Misc',value:5}]
const distByVehicle  = [{ name:'Truck A',value:480},{name:'Truck B',value:320},{name:'Truck C',value:210}]
const statusPieData  = [{ name:'Completed',value:42},{name:'Cancelled',value:18},{name:'Pending',value:12}]
const driverBarData  = [{ driver:'John Doe',trips:12},{driver:'Maria Santos',trips:8},{driver:'Pedro Reyes',trips:15},{driver:'Harvey Specter',trips:5}]



// Helpers 

const parseDate = (d: string) => { const [mm,dd,yy] = d.split('/'); return new Date(`20${yy}-${mm}-${dd}`) }

const inRange = (dateStr: string, from: string, to: string) => {
  const d = parseDate(dateStr)
  return (!from || d >= new Date(from)) && (!to || d <= new Date(to))
}

const uniqueVals = <T,>(arr: T[], key: keyof T) => [...new Set(arr.map(r => String(r[key])))]

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })

const chartTitle = (from: string, to: string) => from && to ? `${fmt(from)} – ${fmt(to)}` : 'All Time'

const peso = (n: number) => `₱${n.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`



// Shared filter card 

interface FilterCardProps {
  from: string; setFrom: (v: string) => void
  to: string; setTo: (v: string) => void
  driver?: string; setDriver?: (v: string) => void; driverOpts?: string[]
  vehicle?: string; setVehicle?: (v: string) => void; vehicleOpts?: string[]
}

const FilterBar = ({ from, setFrom, to, setTo, driver, setDriver, driverOpts, vehicle, setVehicle, vehicleOpts }: FilterCardProps) => (
  <Card>
    <div className="flex items-center gap-6 flex-wrap">
      <span className="font-semibold text-primary flex items-center gap-2">
        Filters
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
        </svg>
      </span>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-expand">From Date</label>
        <input type="date" value={from} onChange={e => setFrom(e.target.value)}
          className="border border-card-border rounded-lg px-3 py-2 text-primary outline-none bg-background" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-expand">To Date</label>
        <input type="date" value={to} onChange={e => setTo(e.target.value)}
          className="border border-card-border rounded-lg px-3 py-2 text-primary outline-none bg-background" />
      </div>
      {setDriver && driverOpts && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-expand">Driver</label>
          <select value={driver} onChange={e => setDriver(e.target.value)}
            className="border border-card-border rounded-lg px-3 py-2 text-primary outline-none bg-background min-w-[160px]">
            <option>All Drivers</option>
            {driverOpts.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      )}
      {setVehicle && vehicleOpts && (
        <div className="flex flex-col gap-1">
          <label className="text-xs text-expand">Vehicles</label>
          <select value={vehicle} onChange={e => setVehicle(e.target.value)}
            className="border border-card-border rounded-lg px-3 py-2 text-primary outline-none bg-background min-w-[160px]">
            <option>All Vehicles</option>
            {vehicleOpts.map(v => <option key={v}>{v}</option>)}
          </select>
        </div>
      )}
    </div>
  </Card>
)

// page

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('Trip Reports')

  const [from, setFrom]       = useState('2025-10-10')
  const [to, setTo]           = useState('2026-09-30')
  const [driver, setDriver]   = useState('All Drivers')
  const [vehicle, setVehicle] = useState('All Vehicles')

  // filters
  const filteredTrips = tripHistory.filter(r =>
    inRange(r.date, from, to) &&
    (driver === 'All Drivers' || r.driver === driver) &&
    (vehicle === 'All Vehicles' || r.vehicle === vehicle)
  )

  const filteredExpenses = expenseRows.filter(r =>
    inRange(r.date, from, to) &&
    (driver === 'All Drivers' || r.driver === driver)
  )

  const filteredVehicles = vehicleRows.filter(r =>
    inRange(r.date, from, to) &&
    (vehicle === 'All Vehicles' || r.vehicle === vehicle)
  )

  const filteredDriverPerf = driverPerfRows.filter(r =>
    inRange(r.date, from, to) &&
    (driver === 'All Drivers' || r.driver === driver)
  )

  const filteredFinancial = financialRows.filter(r =>
    inRange(r.date, from, to) &&
    (driver === 'All Drivers' || r.driver === driver)
  )

  const title = chartTitle(from, to)

  const TableEmpty = () => <li className="p-8 text-center text-expand">No records found for the selected filters.</li>

  return (
    <div className="flex flex-col gap-6">

      {/* Tabs and Export */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer
                ${activeTab === tab ? 'bg-primary text-white' : 'text-primary hover:text-primary-hover'}`}>
              {tab}
            </button>
          ))}
        </div>
        <button className="text-expand font-semibold hover:text-primary-hover">Export Data</button>
      </div>

      {/*  TRIP REPORTS */}
      {activeTab === 'Trip Reports' && (<>
        <FilterBar from={from} setFrom={setFrom} to={to} setTo={setTo}
          driver={driver} setDriver={setDriver} driverOpts={uniqueVals(tripHistory,'driver')}
          vehicle={vehicle} setVehicle={setVehicle} vehicleOpts={uniqueVals(tripHistory,'vehicle')} />

        <CardRowContainer>
          <Card><h2 className="text-expand text-sm">Total Trips</h2><h1 className="text-4xl font-bold mt-1">{filteredTrips.length}</h1></Card>
          <Card><h2 className="text-expand text-sm">Total Distance</h2><h1 className="text-4xl font-bold mt-1">{filteredTrips.reduce((s,r) => s + r.distanceKm, 0)} KM</h1></Card>
          <Card><h2 className="text-expand text-sm">Completed Trips</h2><h1 className="text-4xl font-bold mt-1">{filteredTrips.filter(r => r.status === 'Completed').length}</h1></Card>
          <Card><h2 className="text-expand text-sm">Average Duration</h2><h1 className="text-4xl font-bold mt-1">3.2 hr</h1></Card>
        </CardRowContainer>

        <div className="flex gap-4">
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Trips Trend ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trendData} margin={{top:10,right:20,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef"/>
                <XAxis dataKey="month" tick={{fill:'#457DC2',fontSize:12}}/>
                <YAxis tick={{fill:'#457DC2',fontSize:12}} domain={[0,400]}/>
                <Tooltip/><Line type="monotone" dataKey="trips" stroke="#4A90D9" strokeWidth={2} dot={{r:4,fill:'#1E3A5F'}}/>
              </LineChart>
            </ResponsiveContainer>
          </Card></div>
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Trips Status ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={statusPieData} cx="40%" cy="50%" outerRadius={110} dataKey="value">
                  {statusPieData.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" formatter={v => <span style={{color:'#234875'}}>{v}</span>}/>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card></div>
        </div>

        <Card>
          <h2 className="font-semibold text-xl mb-2">Trip History</h2>
          <ul className="flex flex-col divide-y divide-card-border">
            <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] font-semibold p-4 text-center text-expand">
              <span>Trip Number</span><span>Driver</span><span>Date</span><span>Status</span><span>Route</span><span>Distance</span>
            </li>
            {filteredTrips.length === 0 ? <TableEmpty/> : filteredTrips.map((r,i) => (
              <li key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] p-4 items-center text-center text-primary">
                <span>#{r.tripNumber}</span><span>{r.driver}</span><span>{r.date}</span>
                <span>{r.status}</span><span>{r.route}</span><span>{r.distanceKm} KM</span>
              </li>
            ))}
          </ul>
        </Card>
      </>)}

      {/*  EXPENSE REPORT */}
      {activeTab === 'Expense Report' && (<>
        <FilterBar from={from} setFrom={setFrom} to={to} setTo={setTo}
          driver={driver} setDriver={setDriver} driverOpts={uniqueVals(expenseRows,'driver')} />

        <CardRowContainer>
          <Card><h2 className="text-expand text-sm">Total Expenses</h2><h1 className="text-4xl font-bold mt-1">{peso(filteredExpenses.reduce((s,r)=>s+r.totalExpense,0))}</h1></Card>
          <Card><h2 className="text-expand text-sm">Pending</h2><h1 className="text-4xl font-bold mt-1">{filteredExpenses.filter(r=>r.status==='Pending').length}</h1></Card>
          <Card><h2 className="text-expand text-sm">Approved</h2><h1 className="text-4xl font-bold mt-1">{filteredExpenses.filter(r=>r.status==='Approved').length}</h1></Card>
          <Card><h2 className="text-expand text-sm">Rejected</h2><h1 className="text-4xl font-bold mt-1">{filteredExpenses.filter(r=>r.status==='Rejected').length}</h1></Card>
        </CardRowContainer>

        <div className="flex gap-4">
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Expense Trend ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={expTrendData} margin={{top:10,right:20,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef"/>
                <XAxis dataKey="month" tick={{fill:'#457DC2',fontSize:12}}/>
                <YAxis tick={{fill:'#457DC2',fontSize:12}}/>
                <Tooltip/><Line type="monotone" dataKey="amount" stroke="#4A90D9" strokeWidth={2} dot={{r:4,fill:'#1E3A5F'}}/>
              </LineChart>
            </ResponsiveContainer>
          </Card></div>
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Expense by Type ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={expByType} cx="40%" cy="50%" outerRadius={110} dataKey="value">
                  {expByType.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" formatter={v => <span style={{color:'#234875'}}>{v}</span>}/>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card></div>
        </div>

        <Card>
          <h2 className="font-semibold text-xl mb-2">Expense History</h2>
          <ul className="flex flex-col divide-y divide-card-border">
            <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] font-semibold p-4 text-center text-expand">
              <span>Trip Number</span><span>Driver</span><span>Date</span><span>Status</span><span>Total Expense</span><span>Type</span>
            </li>
            {filteredExpenses.length === 0 ? <TableEmpty/> : filteredExpenses.map((r,i) => (
              <li key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] p-4 items-center text-center text-primary">
                <span>#{r.tripNumber}</span><span>{r.driver}</span><span>{r.date}</span>
                <span>{r.status}</span><span>{peso(r.totalExpense)}</span><span>{r.type}</span>
              </li>
            ))}
          </ul>
        </Card>
      </>)}

      {/* VEHICLE STATS  */}
      {activeTab === 'Vehicle Stats' && (<>
        <FilterBar from={from} setFrom={setFrom} to={to} setTo={setTo}
          vehicle={vehicle} setVehicle={setVehicle} vehicleOpts={uniqueVals(vehicleRows,'vehicle')} />

        <CardRowContainer>
          <Card><h2 className="text-expand text-sm">Total Vehicles</h2><h1 className="text-4xl font-bold mt-1">{uniqueVals(filteredVehicles,'vehicle').length}</h1></Card>
          <Card><h2 className="text-expand text-sm">Active Vehicles</h2><h1 className="text-4xl font-bold mt-1">{filteredVehicles.filter(r=>r.status==='Active').length}</h1></Card>
          <Card><h2 className="text-expand text-sm">Total Distance</h2><h1 className="text-4xl font-bold mt-1">{filteredVehicles.reduce((s,r)=>s+r.distanceKm,0)} KM</h1></Card>
          <Card><h2 className="text-expand text-sm">Total Trips</h2><h1 className="text-4xl font-bold mt-1">{filteredVehicles.length}</h1></Card>
        </CardRowContainer>

        <div className="flex gap-4">
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Vehicle Utilization ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={vehUtilData} margin={{top:10,right:20,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef"/>
                <XAxis dataKey="month" tick={{fill:'#457DC2',fontSize:12}}/>
                <YAxis tick={{fill:'#457DC2',fontSize:12}} domain={[0,400]}/>
                <Tooltip/><Line type="monotone" dataKey="usage" stroke="#4A90D9" strokeWidth={2} dot={{r:4,fill:'#1E3A5F'}}/>
              </LineChart>
            </ResponsiveContainer>
          </Card></div>
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Distance per Vehicle ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={distByVehicle} cx="40%" cy="50%" outerRadius={110} dataKey="value">
                  {distByVehicle.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" formatter={v => <span style={{color:'#234875'}}>{v}</span>}/>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card></div>
        </div>

        <Card>
          <h2 className="font-semibold text-xl mb-2">Vehicle History</h2>
          <ul className="flex flex-col divide-y divide-card-border">
            <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] font-semibold p-4 text-center text-expand">
              <span>Vehicle</span><span>Driver</span><span>Date</span><span>Status</span><span>Route</span><span>Distance</span>
            </li>
            {filteredVehicles.length === 0 ? <TableEmpty/> : filteredVehicles.map((r,i) => (
              <li key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] p-4 items-center text-center text-primary">
                <span>{r.vehicle}</span><span>{r.driver}</span><span>{r.date}</span>
                <span>{r.status}</span><span>{r.route}</span><span>{r.distanceKm} KM</span>
              </li>
            ))}
          </ul>
        </Card>
      </>)}

      {/* DRIVER PERFORMANCE aaa*/}
      {activeTab === 'Driver Performance' && (<>
        <FilterBar from={from} setFrom={setFrom} to={to} setTo={setTo}
          driver={driver} setDriver={setDriver} driverOpts={uniqueVals(driverPerfRows,'driver')} />

        <CardRowContainer>
          <Card><h2 className="text-expand text-sm">Total Drivers</h2><h1 className="text-4xl font-bold mt-1">{filteredDriverPerf.length}</h1></Card>
          <Card><h2 className="text-expand text-sm">Total Trips</h2><h1 className="text-4xl font-bold mt-1">{filteredDriverPerf.reduce((s,r)=>s+r.totalTrips,0)}</h1></Card>
          <Card><h2 className="text-expand text-sm">Total Completed</h2><h1 className="text-4xl font-bold mt-1">{filteredDriverPerf.reduce((s,r)=>s+r.completed,0)}</h1></Card>
          <Card><h2 className="text-expand text-sm">In Transit</h2><h1 className="text-4xl font-bold mt-1">{filteredDriverPerf.reduce((s,r)=>s+r.inTransit,0)}</h1></Card>
        </CardRowContainer>

        <div className="flex gap-4">
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Trips per Driver ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={driverBarData} margin={{top:10,right:20,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef"/>
                <XAxis dataKey="driver" tick={{fill:'#457DC2',fontSize:11}}/>
                <YAxis tick={{fill:'#457DC2',fontSize:12}}/>
                <Tooltip/><Bar dataKey="trips" fill="#4A90D9" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </Card></div>
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Completion Rate ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={statusPieData} cx="40%" cy="50%" outerRadius={110} dataKey="value">
                  {statusPieData.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" formatter={v => <span style={{color:'#234875'}}>{v}</span>}/>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card></div>
        </div>

        <Card>
          <h2 className="font-semibold text-xl mb-2">Driver Performance</h2>
          <ul className="flex flex-col divide-y divide-card-border">
            <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] font-semibold p-4 text-center text-expand">
              <span>Driver</span><span>Total Trips</span><span>Completed</span><span>In Transit</span><span>Avg Distance</span>
            </li>
            {filteredDriverPerf.length === 0 ? <TableEmpty/> : filteredDriverPerf.map((r,i) => (
              <li key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] p-4 items-center text-center text-primary">
                <span>{r.driver}</span><span>{r.totalTrips}</span><span>{r.completed}</span>
                <span>{r.inTransit}</span><span>{r.avgDistanceKm} KM</span>
              </li>
            ))}
          </ul>
        </Card>
      </>)}

      {/* FINANCIAL SUMMARY  */}
      {activeTab === 'Financial Summary' && (<>
        <FilterBar from={from} setFrom={setFrom} to={to} setTo={setTo}
          driver={driver} setDriver={setDriver} driverOpts={uniqueVals(financialRows,'driver')} />

        {(() => {
          const totalRev  = filteredFinancial.reduce((s,r)=>s+r.revenue,0)
          const totalExp  = filteredFinancial.reduce((s,r)=>s+r.expenses,0)
          const netProfit = filteredFinancial.reduce((s,r)=>s+r.profit,0)
          const margin    = totalRev > 0 ? ((netProfit/totalRev)*100).toFixed(1) : '0.0'
          return (
            <CardRowContainer>
              <Card><h2 className="text-expand text-sm">Total Revenue</h2><h1 className="text-4xl font-bold mt-1">{peso(totalRev)}</h1></Card>
              <Card><h2 className="text-expand text-sm">Total Expenses</h2><h1 className="text-4xl font-bold mt-1">{peso(totalExp)}</h1></Card>
              <Card><h2 className="text-expand text-sm">Net Profit</h2><h1 className="text-4xl font-bold mt-1">{peso(netProfit)}</h1></Card>
              <Card><h2 className="text-expand text-sm">Profit Margin</h2><h1 className="text-4xl font-bold mt-1">{margin}%</h1></Card>
            </CardRowContainer>
          )
        })()}

        <div className="flex gap-4">
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Revenue vs Expenses ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={finTrendData} margin={{top:10,right:20,left:0,bottom:0}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef"/>
                <XAxis dataKey="month" tick={{fill:'#457DC2',fontSize:12}}/>
                <YAxis tick={{fill:'#457DC2',fontSize:12}}/>
                <Tooltip/>
                <Line type="monotone" dataKey="revenue" stroke="#1E3A5F" strokeWidth={2} dot={{r:3}} name="Revenue"/>
                <Line type="monotone" dataKey="expenses" stroke="#FAA7A2" strokeWidth={2} dot={{r:3}} name="Expenses"/>
                <Legend formatter={v => <span style={{color:'#234875'}}>{v}</span>}/>
              </LineChart>
            </ResponsiveContainer>
          </Card></div>
          <div className="flex-1"><Card>
            <h2 className="font-semibold mb-4">Revenue Breakdown ({title})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={expByType} cx="40%" cy="50%" outerRadius={110} dataKey="value">
                  {expByType.map((_,i) => <Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" formatter={v => <span style={{color:'#234875'}}>{v}</span>}/>
                <Tooltip/>
              </PieChart>
            </ResponsiveContainer>
          </Card></div>
        </div>

        <Card>
          <h2 className="font-semibold text-xl mb-2">Financial History</h2>
          <ul className="flex flex-col divide-y divide-card-border">
            <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] font-semibold p-4 text-center text-expand">
              <span>Trip Number</span><span>Driver</span><span>Date</span><span>Revenue</span><span>Expenses</span><span>Profit</span>
            </li>
            {filteredFinancial.length === 0 ? <TableEmpty/> : filteredFinancial.map((r,i) => (
              <li key={i} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] p-4 items-center text-center text-primary">
                <span>#{r.tripNumber}</span><span>{r.driver}</span><span>{r.date}</span>
                <span>{peso(r.revenue)}</span><span>{peso(r.expenses)}</span><span>{peso(r.profit)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </>)}

    </div>
  )
}

export default AnalyticsPage
