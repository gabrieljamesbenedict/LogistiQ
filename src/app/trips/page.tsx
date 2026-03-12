'use client'

import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { apiFetch } from '../lib/api'

enum TripStatus {
  IN_TRANSIT = 'In Transit',
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  ARRIVED = 'Arrived',
}

interface Trip {
  id: number
  driver: string
  origin: string
  destination: string
  date: string
  status: TripStatus
  customerName?: string
  totalExpenses?: number
  totalProfit?: number
  packageWeight?: string
  totalDistance?: string
}

interface Checkpoint {
  label: string
  location: string
  time: string
  note?: string
}

const statusColors: Record<TripStatus, string> = {
  [TripStatus.IN_TRANSIT]: 'text-[#E8A020]',
  [TripStatus.PENDING]: 'text-[#E8A020]',
  [TripStatus.ARRIVED]: 'text-[#4A90D9]',
  [TripStatus.COMPLETED]: 'text-[#2DB68A]',
}

const dummyTrips: Trip[] = [ // fallback dummy data. remove this
  { id: 108284, driver: 'Juan Dela Cruz',   origin: 'Mapua Makati, Pablo Ocampo Sr. Ext.', destination: '#148 Rizal Ave., Caloocan City', date: '2026-03-10', status: TripStatus.COMPLETED,  packageWeight: '103 KG', totalDistance: '98.02 KM',  totalExpenses: 1294.25 },
  { id: 108291, driver: 'Maria Santos',     origin: 'Taguig, BGC, 9th Ave.',               destination: '#22 Mabini St., Pasay City',      date: '2026-03-10', status: TripStatus.IN_TRANSIT, packageWeight: '75 KG',  totalDistance: '22.50 KM',  totalExpenses: 540.00  },
  { id: 108305, driver: 'Ramon Reyes',      origin: 'Quezon City, Commonwealth Ave.',       destination: '#5 Gen. Luna St., Marikina',      date: '2026-03-11', status: TripStatus.PENDING,    packageWeight: '200 KG', totalDistance: '35.80 KM',  totalExpenses: 820.75  },
  { id: 108312, driver: 'Ana Villanueva',   origin: 'Makati, Ayala Ave.',                   destination: '#90 Shaw Blvd., Mandaluyong',     date: '2026-03-11', status: TripStatus.ARRIVED,    packageWeight: '50 KG',  totalDistance: '10.10 KM',  totalExpenses: 310.50  },
  { id: 108320, driver: 'Jose Mendoza',     origin: 'Pasig, Ortigas Center',                destination: '#3 Espana Blvd., Sampaloc',       date: '2026-03-12', status: TripStatus.COMPLETED,  packageWeight: '128 KG', totalDistance: '55.40 KM',  totalExpenses: 975.00  },
  { id: 108337, driver: 'Lito Bautista',    origin: 'Parañaque, Sucat Rd.',                 destination: '#11 Macapagal Blvd., Pasay',      date: '2026-03-12', status: TripStatus.IN_TRANSIT, packageWeight: '88 KG',  totalDistance: '14.75 KM',  totalExpenses: 460.20  },
  { id: 108344, driver: 'Grace Lim',        origin: 'Valenzuela, McArthur Hwy.',            destination: '#67 Rizal Ave. Ext., Caloocan',   date: '2026-03-13', status: TripStatus.PENDING,    packageWeight: '310 KG', totalDistance: '18.30 KM',  totalExpenses: 650.00  },
  { id: 108358, driver: 'Juan Dela Cruz',   origin: 'Mapua Makati, Pablo Ocampo Sr. Ext.', destination: '#202 Aurora Blvd., Cubao',        date: '2026-03-13', status: TripStatus.IN_TRANSIT, packageWeight: '95 KG',  totalDistance: '42.60 KM',  totalExpenses: 810.90  },
]

const dummyCheckpoints: Checkpoint[] = [ // remove later
  { label: 'Truck Assigned', location: 'HQ Place Somehwere st', time: '10:00 AM', note: 'Driver Name Here' },
  { label: 'Checkpoint Name', location: 'HQ Place Somehwere st', time: '10:00 AM' },
  { label: 'Gas Stop', location: 'HQ Place Somehwere st', time: '10:00 AM', note: 'Cost Price' },
  { label: 'Checkpoint', location: 'HQ Place Somehwere st', time: '10:00 AM' },
  { label: 'Reached Destination', location: 'HQ Place Somehwere st', time: '10:00 AM' },
]

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>(dummyTrips)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [search, setSearch] = useState('')
  const [monthFilter, setMonthFilter] = useState('This year')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await apiFetch('/trips')
        if (data && data.length > 0) setTrips(data)
      } catch (error) {
        console.error('Error loading trips:', error)
      }
    }
    loadTrips()
  }, [])

  const filtered = trips.filter(t => {
    const matchSearch =
      String(t.id).includes(search) ||
      t.driver.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || t.status === statusFilter
    const tripDate = new Date(t.date)
    const now = new Date()
    let matchTime = true
    if (monthFilter === 'This month') {
      matchTime = tripDate.getMonth() === now.getMonth() && tripDate.getFullYear() === now.getFullYear()
    } else if (monthFilter === 'Last month') {
      const last = new Date(now.getFullYear(), now.getMonth() - 1)
      matchTime = tripDate.getMonth() === last.getMonth() && tripDate.getFullYear() === last.getFullYear()
    } else if (monthFilter === 'This year') {
      matchTime = tripDate.getFullYear() === now.getFullYear()
    }
    return matchSearch && matchStatus && matchTime
  })

  const selected = filtered[selectedIndex] ?? null

  return (
    <div className="flex flex-col gap-4">

      {/* Top bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          className="bg-card border border-card-border rounded-lg px-4 py-2 text-primary placeholder:text-expand outline-none flex-1 max-w-sm"
          placeholder="Search for Order Number..."
          value={search}
          onChange={e => { setSearch(e.target.value); setSelectedIndex(0) }}
        />
        <select
          className="bg-card border border-card-border rounded-lg px-3 py-2 text-primary outline-none"
          value={monthFilter}
          onChange={e => { setMonthFilter(e.target.value); setSelectedIndex(0) }}
        >
          <option>This month</option>
          <option>Last month</option>
          <option>This year</option>
        </select>
        <button
          onClick={() => setShowFilters(p => !p)}
          className={`border rounded-lg px-3 py-2 cursor-pointer transition-colors ${showFilters ? 'bg-primary text-white border-primary' : 'bg-card border-card-border text-primary'}`}
        >
          Filters
        </button>
        {showFilters && (
          <select
            className="bg-card border border-card-border rounded-lg px-3 py-2 text-primary outline-none"
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setSelectedIndex(0) }}
          >
            <option>All</option>
            <option>In Transit</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Arrived</option>
          </select>
        )}
        <div className="flex-1" />
        <button className="text-expand font-semibold hover:text-primary-hover">Export Data</button>
      </div>

      {/* Main layout */}
      <div className="flex gap-4 items-start">

        {/* Trip list */}
        <div className="flex flex-col gap-3 w-[45%] max-h-[75vh] overflow-y-auto pr-1">
          {filtered.map((trip, i) => (
            <div key={i} onClick={() => setSelectedIndex(i)} className="cursor-pointer">
              <Card className={`transition-all ${selectedIndex === i ? 'shadow-lg' : ''}`}>
                <div className="flex justify-between items-start p-2">
                  {/* Left pane for ID, status, driver */}
                  <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-primary">#{trip.id}</h1>
                    <span className={`text-sm font-medium ${statusColors[trip.status]}`}>{trip.status}</span>
                    <p className="text-primary mt-2">{trip.driver}</p>
                  </div>
                  {/* Right route info */}
                  <div className="flex gap-2 items-start">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <div className="w-3 h-3 rounded-full bg-[#4A90D9]" />
                      <div className="w-0.5 h-8 bg-[#4A90D9]" />
                      <div className="w-3 h-3 rounded-full border-2 border-[#4A90D9]" />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <p className="text-xs text-expand">Pickup</p>
                        <p className="text-sm text-primary">{trip.origin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-expand">Drop Off</p>
                        <p className="text-sm text-primary">{trip.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-expand py-8">No trips found.</p>
          )}
        </div>

        {/* Route Map detail */}
        {selected && (
          <div className="flex-1">
            <Card>
              <h2 className="text-xl font-semibold text-primary mb-6">Route Map</h2>

              {/* Timeline */}
              <div className="flex flex-col gap-0">
                {dummyCheckpoints.map((cp, i) => (
                  <div key={i} className="flex gap-4">
                    {/* Dot and line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 shrink-0 mt-1
                        ${i === 0 ? 'bg-[#4A90D9] border-[#4A90D9]' : 'bg-white border-[#4A90D9]'}`}
                      />
                      {i < dummyCheckpoints.length - 1 && (
                        <div className="w-0.5 flex-1 bg-[#4A90D9] my-1 min-h-[32px]" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex justify-between w-full pb-5">
                      <div>
                        <p className="font-semibold text-primary">{cp.label}</p>
                        <p className="text-expand text-sm">{cp.location}</p>
                        {cp.note && <p className="text-primary text-sm">{cp.note}</p>}
                      </div>
                      <p className="text-primary text-sm shrink-0">{cp.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-background rounded-lg p-4 mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-expand text-xs">Driver Name</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-4 bg-primary rounded-sm shrink-0" />
                    <p className="text-primary font-medium">{selected.driver}</p>
                  </div>
                </div>
                <div>
                  <p className="text-expand text-xs">Total Distance</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-4 bg-primary rounded-sm shrink-0" />
                    <p className="text-primary font-medium">{selected.totalDistance ?? 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-expand text-xs">Package Weight</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-4 bg-primary rounded-sm shrink-0" />
                    <p className="text-primary font-medium">{selected.packageWeight ?? 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-expand text-xs">Total Expense</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-4 bg-primary rounded-sm shrink-0" />
                    <p className="text-primary font-medium">
                      {selected.totalExpenses != null
                        ? `₱${selected.totalExpenses.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

            </Card>
          </div>
        )}

      </div>
    </div>
  )
}

export default TripsPage
