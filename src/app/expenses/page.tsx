"use client"

import { useState, useEffect } from 'react';
import Card from '../components/Card';
import CardRowContainer from '../components/CardRowContainer';
import { apiFetch } from '../lib/api';

enum ExpenseStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

interface Expense {
  id: number;
  tripNumber: string;
  driver: string;
  date: string;
  status: ExpenseStatus;
  totalExpense: number;
  type: string;
}

const statusColors: Record<ExpenseStatus, string> = {
  [ExpenseStatus.PENDING]: 'bg-[#FFBF75]',
  [ExpenseStatus.APPROVED]: 'bg-[#A5F7E2]',
  [ExpenseStatus.REJECTED]: 'bg-[#FAA7A2]',
};

const ExpensesPage = () => {
  const dummyExpenses: Expense[] = [
    { id: 1, tripNumber: '1001', driver: 'Juan Dela Cruz', date: '2026-03-01', status: ExpenseStatus.PENDING, totalExpense: 350, type: 'Toll' },
    { id: 2, tripNumber: '1002', driver: 'Maria Santos', date: '2026-03-02', status: ExpenseStatus.APPROVED, totalExpense: 1200, type: 'Fuel' },
    { id: 3, tripNumber: '1003', driver: 'Pedro Reyes', date: '2026-03-03', status: ExpenseStatus.REJECTED, totalExpense: 150, type: 'Parking' },
    { id: 4, tripNumber: '1004', driver: 'Ana Cruz', date: '2026-03-04', status: ExpenseStatus.APPROVED, totalExpense: 800, type: 'Maintenance' },
    { id: 5, tripNumber: '1005', driver: 'Juan Dela Cruz', date: '2026-03-05', status: ExpenseStatus.PENDING, totalExpense: 500, type: 'Miscellaneous' },
  ];

  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('This year');

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await apiFetch('/expenses');
        setExpenses(data);
      } catch (error) {
        console.error('Error loading expenses:', error);
      }
    };
    loadExpenses();
  }, []);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.totalExpense, 0);
  const pendingCount = expenses.filter(e => e.status === ExpenseStatus.PENDING).length;
  const approvedCount = expenses.filter(e => e.status === ExpenseStatus.APPROVED).length;
  const rejectedCount = expenses.filter(e => e.status === ExpenseStatus.REJECTED).length;

  const filtered = expenses.filter(e => {
    const matchSearch =
      e.tripNumber.toLowerCase().includes(search.toLowerCase()) ||
      e.driver.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = (id: number) => {
    setExpenses(prev =>
      prev.map(e => e.id === id ? { ...e, status: ExpenseStatus.APPROVED } : e)
    );
  };

  const handleReject = (id: number) => {
    setExpenses(prev =>
      prev.map(e => e.id === id ? { ...e, status: ExpenseStatus.REJECTED } : e)
    );
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Filter bar */}
      <div className="flex items-center gap-3">
        <input
          className="bg-card border border-card-border rounded-lg px-4 py-2 text-primary placeholder:text-expand outline-none flex-1 max-w-sm"
          placeholder="Search for Order Number, Name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="bg-card border border-card-border rounded-lg px-3 py-2 text-primary outline-none"
          value={yearFilter}
          onChange={e => setYearFilter(e.target.value)}
        >
          <option>This year</option>
          <option>Last year</option>
        </select>
        <select
          className="bg-card border border-card-border rounded-lg px-3 py-2 text-primary outline-none"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <div className="flex-1" />
        <button className="text-expand font-semibold hover:text-primary-hover">
          Export Data
        </button>
      </div>

      {/* Stat cards */}
      <CardRowContainer>
        <Card>
          <h2 className="text-expand">Total Expenses</h2>
          <h1 className="text-3xl font-bold mt-1">
            ₱{totalExpenses.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </h1>
        </Card>
        <Card>
          <h2 className="text-expand">Pending Review</h2>
          <h1 className="text-3xl font-bold mt-1">{pendingCount}</h1>
        </Card>
        <Card>
          <h2 className="text-expand">Approved</h2>
          <h1 className="text-3xl font-bold mt-1">{approvedCount}</h1>
        </Card>
        <Card>
          <h2 className="text-expand">Rejected</h2>
          <h1 className="text-3xl font-bold mt-1">{rejectedCount}</h1>
        </Card>
      </CardRowContainer>

      {/* Expense table */}
      <Card>
        <h2 className="font-semibold text-xl mb-2">Trip History</h2>
        <div className="text-base">
          <ul className="flex flex-col divide-y divide-card-border">
            <li className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] font-semibold p-4 text-center text-expand">
              <span>Trip Number</span>
              <span>Driver</span>
              <span>Date</span>
              <span>Status</span>
              <span>Total Expense</span>
              <span>Type</span>
              <span>Actions</span>
            </li>
            {filtered.length === 0 ? (
              <li className="p-8 text-center text-expand">No expenses found.</li>
            ) : filtered.map(expense => (
              <li
                key={expense.id}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] p-4 items-center text-center text-primary"
              >
                <span>#{expense.tripNumber}</span>
                <span>{expense.driver}</span>
                <span>{new Date(expense.date).toLocaleDateString('en-PH')}</span>
                <span>
                  <span className={`px-3 py-0.5 rounded-full text-sm ${statusColors[expense.status]}`}>
                    {expense.status}
                  </span>
                </span>
                <span>₱{expense.totalExpense.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                <span>{expense.type}</span>
                <span className="flex justify-center gap-2">
                  {expense.status === ExpenseStatus.PENDING && (
                    <>
                      <button
                        onClick={() => handleApprove(expense.id)}
                        className="bg-[#A5F7E2] hover:opacity-80 text-primary rounded px-2 py-1 cursor-pointer"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleReject(expense.id)}
                        className="bg-[#FAA7A2] hover:opacity-80 text-primary rounded px-2 py-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </>
                  )}
                  {expense.status === ExpenseStatus.APPROVED && (
                    <button className="bg-[#A5F7E2] text-primary rounded px-2 py-1 cursor-default">✓</button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

    </div>
  );
};

export default ExpensesPage;
