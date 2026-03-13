'use client'

import { useEffect, useState } from 'react'
import Card from '../components/Card'
import CardRowContainer from '../components/CardRowContainer'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { HistoryList, Trip } from '../components/TripList'

const tabs = ['Trip Reports', 'Expense Report', 'Vehicle Stats', 'Driver Performance', 'Financial Summary']

const trendData = [ // delete dummy data
  { month: 'Aug', trips: 160 },
  { month: 'Sept', trips: 185 },
  { month: 'Oct', trips: 260 },
  { month: 'Nov', trips: 265 },
  { month: 'Dec', trips: 225 },
  { month: 'Jan', trips: 295 },
  { month: 'Feb', trips: 330 },
]

const statusData = [ // dummy data remove later
  { name: 'Completed', value: 42 },
  { name: 'Cancelled', value: 18 },
  { name: 'Pending', value: 12 },
]

const STATUS_COLORS = ['#1E3A5F', '#4A90D9', '#A8C8F0']


const AnalyticsPage = () => {
  const [tripsData, setTripsData] = useState<Trip[]>([]); 
  const [activeTab, setActiveTab] = useState('Trip Reports')
  const [fromDate, setFromDate] = useState('2025-10-10')
  const [toDate, setToDate] = useState('2026-02-22')
  const [driver, setDriver] = useState('All Drivers')
  const [vehicle, setVehicle] = useState('All Vehicles')

  useEffect(() => {
    const fetchDashboardData = async () => {
      const credentials = btoa("admin:secret"); 
      const headers = {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      };

      try {
        const tripsResponse = await fetch("http://localhost:8080/api/trips", { headers });
        if (tripsResponse.ok) {
          const trips = await tripsResponse.json();
          setTripsData(Array.isArray(trips) ? trips : []);
        } else {
          console.error("Failed to fetch trips:", tripsResponse.status);
        }
      } catch (error) {
        console.error("Error connecting to backend:", error);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <div className="flex flex-col gap-6">

      {/* Tabs + Export */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer
                ${activeTab === tab
                  ? 'bg-primary text-white'
                  : 'text-primary hover:text-primary-hover'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="text-expand font-semibold hover:text-primary-hover">
          Export Data
        </button>
      </div>

      {activeTab === 'Trip Reports' && (
        <>
          {/* Filters */}
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
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="border border-card-border rounded-lg px-3 py-2 text-primary outline-none bg-background"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-expand">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="border border-card-border rounded-lg px-3 py-2 text-primary outline-none bg-background"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-expand">Driver</label>
                <select
                  value={driver}
                  onChange={e => setDriver(e.target.value)}
                  className="border border-card-border rounded-lg px-3 py-2 text-primary outline-none bg-background min-w-[160px]"
                >
                  <option>All Drivers</option>
                  <option>John Doe</option>
                  <option>Maria Santos</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-expand">Vehicles</label>
                <select
                  value={vehicle}
                  onChange={e => setVehicle(e.target.value)}
                  className="border border-card-border rounded-lg px-3 py-2 text-primary outline-none bg-background min-w-[160px]"
                >
                  <option>All Vehicles</option>
                  <option>Truck A</option>
                  <option>Truck B</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Stat cards */}
          <CardRowContainer>
            <Card>
              <h2 className="text-expand text-sm">Total Trips</h2>
              <div className="flex items-end gap-2 mt-1">
                <h1 className="text-4xl font-bold">242</h1>
                <span className="text-expand text-sm mb-1">↑ +8%</span>
              </div>
            </Card>
            <Card>
              <h2 className="text-expand text-sm">Total Distance</h2>
              <div className="flex items-end gap-2 mt-1">
                <h1 className="text-4xl font-bold">567 KM</h1>
                <span className="text-expand text-sm mb-1">↑ +1%</span>
              </div>
            </Card>
            <Card>
              <h2 className="text-expand text-sm">Completed Trips</h2>
              <h1 className="text-4xl font-bold mt-1">42</h1>
            </Card>
            <Card>
              <h2 className="text-expand text-sm">Average Duration</h2>
              <h1 className="text-4xl font-bold mt-1">3.2 hr</h1>
            </Card>
          </CardRowContainer>

          {/* Charts */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Card>
                <h2 className="font-semibold mb-4">Trips Trend (Oct 10, 2025 – Feb 22, 2026)</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ef" />
                    <XAxis dataKey="month" tick={{ fill: '#457DC2', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#457DC2', fontSize: 12 }} domain={[0, 400]} ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="trips" stroke="#4A90D9" strokeWidth={2} dot={{ r: 4, fill: '#1E3A5F' }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div className="flex-1">
              <Card>
                <h2 className="font-semibold mb-4">Trips Status (Oct 10, 2025 – Feb 22, 2026)</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="40%"
                      cy="50%"
                      outerRadius={110}
                      dataKey="value"
                    >
                      {statusData.map((_, index) => (
                        <Cell key={index} fill={STATUS_COLORS[index]} />
                      ))}
                    </Pie>
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      formatter={(value) => <span style={{ color: '#234875' }}>{value}</span>}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>

          {/* Trip History */}
        <Card>
          <h2>Trip History</h2>
          <HistoryList trips={tripsData}/>
        </Card>
        </>
      )}

      {activeTab !== 'Trip Reports' && (
        <Card>
          <p className="text-center text-expand py-16 text-lg">{activeTab} — coming soon</p>
        </Card>
      )}

    </div>
  )
}

export default AnalyticsPage
