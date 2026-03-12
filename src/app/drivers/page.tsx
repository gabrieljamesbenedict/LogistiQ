'use client'

import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { apiFetch } from '../lib/api'

enum DriverStatus {
  ACTIVE = 'Active',
  ON_TRIP = 'On Trip',
  ON_LEAVE = 'On Leave',
}

interface Driver {
  id: number
  name: string
  license: string
  totalTrips: number
  status: DriverStatus
}

const statusColors: Record<DriverStatus, string> = {
  [DriverStatus.ACTIVE]: 'bg-[#A5F7E2] text-primary',
  [DriverStatus.ON_TRIP]: 'bg-[#FFBF75] text-primary',
  [DriverStatus.ON_LEAVE]: 'bg-[#FAA7A2] text-primary',
}

const dummyDrivers: Driver[] = [ // dummy
  { id: 1, name: 'John Doe',       license: 'ABC-1234', totalTrips: 12, status: DriverStatus.ACTIVE },
  { id: 2, name: 'Jane Smith',     license: 'DEF-5678', totalTrips: 8,  status: DriverStatus.ON_TRIP },
  { id: 3, name: 'Mike Ross',      license: 'GHI-9012', totalTrips: 15, status: DriverStatus.ACTIVE },
  { id: 4, name: 'Harvey Specter', license: 'JKL-3456', totalTrips: 5,  status: DriverStatus.ON_LEAVE },
]

const getInitials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

const DriversPage = () => {
  const [drivers, setDrivers] = useState<Driver[]>(dummyDrivers)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const [showAddModal, setShowAddModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [newLicense, setNewLicense] = useState('')
  const [newStatus, setNewStatus] = useState<DriverStatus>(DriverStatus.ACTIVE)

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        const data = await apiFetch('/drivers')
        setDrivers(data)
      } catch (error) {
        console.error('Error loading drivers:', error)
      }
    }
    loadDrivers()
  }, [])

  const filtered = drivers.filter(d => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.license.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  const handleAddDriver = () => {
    if (!newName.trim() || !newLicense.trim()) return
    const newDriver: Driver = {
      id: Date.now(),
      name: newName.trim(),
      license: newLicense.trim(),
      totalTrips: 0,
      status: newStatus,
    }
    setDrivers(prev => [...prev, newDriver])
    setNewName('')
    setNewLicense('')
    setNewStatus(DriverStatus.ACTIVE)
    setShowAddModal(false)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Top bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          className="bg-card border border-card-border rounded-lg px-4 py-2 text-primary placeholder:text-expand outline-none flex-1 max-w-sm"
          placeholder="Search by driver name or license..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
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
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>On Trip</option>
            <option>On Leave</option>
          </select>
        )}
        <div className="flex-1" />
        <button className="text-expand font-semibold hover:text-primary-hover">
          Export Data
        </button>
      </div>

      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Drive Management</h1>
          <p className="text-expand mt-1">Monitor and manage delivery crew records.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-3 rounded-lg cursor-pointer"
        >
          + Add New Driver
        </button>
      </div>

      {/* Driver list */}
      <Card>
        <h2 className="font-semibold text-lg mb-2">Active Delivery Crew</h2>
        <ul className="flex flex-col divide-y divide-card-border">
          {filtered.map(driver => (
            <li key={driver.id} className="flex items-center gap-4 py-4 px-2">
              <div className="bg-gray-200 rounded-full size-12 flex items-center justify-center font-semibold text-primary shrink-0">
                {getInitials(driver.name)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary">{driver.name}</p>
                <p className="text-expand text-sm">License: <span className="font-semibold">{driver.license}</span></p>
              </div>
              <div className="text-center min-w-[100px]">
                <p className="text-expand text-sm">Total Trips</p>
                <p className="text-2xl font-bold text-primary">{driver.totalTrips}</p>
              </div>
              <div className="min-w-[120px] flex justify-end">
                <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusColors[driver.status]}`}>
                  {driver.status}
                </span>
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="py-12 text-center text-expand">No drivers found.</li>
          )}
        </ul>
      </Card>

      {/* Driver Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-5 w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-primary">Add New Driver</h2>

            <div className="flex flex-col gap-1">
              <label className="text-expand text-sm">Driver Name</label>
              <input
                className="border border-card-border rounded-lg px-4 py-2 text-primary outline-none"
                placeholder="e.g. Juan Dela Cruz"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-expand text-sm">License Plate</label>
              <input
                className="border border-card-border rounded-lg px-4 py-2 text-primary outline-none"
                placeholder="e.g. ABC-1234"
                value={newLicense}
                onChange={e => setNewLicense(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-expand text-sm">Status</label>
              <select
                className="border border-card-border rounded-lg px-4 py-2 text-primary outline-none"
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as DriverStatus)}
              >
                <option value={DriverStatus.ACTIVE}>Active</option>
                <option value={DriverStatus.ON_TRIP}>On Trip</option>
                <option value={DriverStatus.ON_LEAVE}>On Leave</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end mt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2 border border-card-border rounded-lg text-primary hover:bg-background cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDriver}
                disabled={!newName.trim() || !newLicense.trim()}
                className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Driver
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default DriversPage
