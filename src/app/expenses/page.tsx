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
  const dummyExpenses: Expense[] = [ // delete dummy data
    { id: 1, tripNumber: '1038', driver: 'John Doe', date: '2026-09-12', status: ExpenseStatus.PENDING, totalExpense: 1230, type: 'Miscellaneous' },
    { id: 2, tripNumber: '1038', driver: 'John Doe', date: '2026-09-12', status: ExpenseStatus.APPROVED, totalExpense: 1230, type: 'Fuel' },
    { id: 3, tripNumber: '1038', driver: 'John Doe', date: '2026-09-12', status: ExpenseStatus.APPROVED, totalExpense: 1230, type: 'Fuel' },
    { id: 4, tripNumber: '1038', driver: 'John Doe', date: '2026-09-12', status: ExpenseStatus.APPROVED, totalExpense: 1230, type: 'Air Pump' },
  ];

  const [expenses, setExpenses] = useState<Expense[]>(dummyExpenses);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('This year');
  const [modalExpense, setModalExpense] = useState<Expense | null>(null);
  const [comment, setComment] = useState('');

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
    const expenseYear = new Date(e.date).getFullYear();
    const now = new Date();
    const matchYear = yearFilter === 'This year'
      ? expenseYear === now.getFullYear()
      : expenseYear === now.getFullYear() - 1;
    return matchSearch && matchStatus && matchYear;
  });

  const openModal = (expense: Expense) => {
    setModalExpense(expense);
    setComment('');
  };

  const closeModal = () => {
    setModalExpense(null);
    setComment('');
  };

  const handleApprove = (id: number) => {
    setExpenses(prev =>
      prev.map(e => e.id === id ? { ...e, status: ExpenseStatus.APPROVED } : e)
    );
    closeModal();
  };

  const handleReject = (id: number) => {
    setExpenses(prev =>
      prev.map(e => e.id === id ? { ...e, status: ExpenseStatus.REJECTED } : e)
    );
    closeModal();
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
                onClick={() => openModal(expense)}
                className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] p-4 items-center text-center text-primary cursor-pointer hover:bg-background transition-colors"
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
                <span className="flex justify-center gap-2" onClick={e => e.stopPropagation()}>
                  {expense.status === ExpenseStatus.PENDING && (
                    <>
                      <button
                        onClick={() => openModal(expense)}
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

      {/* Modal */}
      {modalExpense && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8 flex flex-col gap-6"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-primary">Approve Expense</h2>

            {/* Details grid */}
            <div className="bg-background rounded-xl p-5 grid grid-cols-2 gap-5">
              <div>
                <p className="text-expand text-xs mb-1">Trip Number</p>
                <p className="text-primary font-semibold text-lg">#{modalExpense.tripNumber}</p>
              </div>
              <div>
                <p className="text-expand text-xs mb-1">Total Expense</p>
                <p className="text-primary font-semibold text-lg">
                  ₱{modalExpense.totalExpense.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-expand text-xs mb-1">Driver Name</p>
                <p className="text-primary font-semibold text-lg">{modalExpense.driver}</p>
              </div>
              <div>
                <p className="text-expand text-xs mb-1">Date</p>
                <p className="text-primary font-semibold text-lg">
                  {new Date(modalExpense.date).toLocaleDateString('en-PH')}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-expand text-xs mb-1">Type</p>
                <p className="text-primary font-semibold text-lg">{modalExpense.type}</p>
              </div>
            </div>

            {/* Comments */}
            <div>
              <p className="text-primary text-sm mb-2">Comments</p>
              <textarea
                className="w-full border border-card-border rounded-lg p-3 text-primary outline-none resize-none bg-white"
                rows={4}
                placeholder=""
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-card-border rounded-lg text-primary hover:bg-background cursor-pointer"
              >
                Cancel
              </button>
              {modalExpense.status === ExpenseStatus.PENDING && (
                <button
                  onClick={() => handleApprove(modalExpense.id)}
                  className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg cursor-pointer"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ExpensesPage;
