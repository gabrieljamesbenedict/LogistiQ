"use client"

import React, { useEffect, useState } from 'react'
import Card from '../Card'
import Chart from '../PieChartCard'
import { Expense, getAllExpenses } from '@/service/ExpenseService'
import { getTrip } from '@/service/TripService'

const RecentExpensesTableCard = ({title}: any) => {

  const [recentExpenseList, setRecentExpenseList] = useState<Expense[]>([]);

  useEffect(() => {

    getAllExpenses().then(result => setRecentExpenseList(result.slice(0, 10)));
    
  },[]);
  
  return (
    <Card>
      <h2 className="font-semibold text-xl mb-2">{title}</h2>

      <ul className="flex flex-col divide-y divide-card-border min-h-75">

        {/* Header */}
        <li className="grid grid-cols-[1fr_2fr_1fr_1fr] font-semibold p-4 text-center text-expand">
          <span>Expense ID</span>
          <span>Amount</span>
          <span>Description</span>
          <span>Category</span>
        </li>

        {/* Rows */}
        {recentExpenseList.map((expense) => (
          <li
            key={expense.expenseId}
            className="grid grid-cols-[1fr_2fr_1fr_1fr] p-4 items-center text-center text-primary hover:bg-card-hover transition"
          >
            <span>{expense.expenseId}</span>
            <span>PHP {expense.amount}</span>
            <span>{expense.description}</span>
            <span>{expense.category}</span>
          </li>
        ))}

      </ul>
    </Card>
  )
}

export default RecentExpensesTableCard

// export interface Expense {
//   expenseId: number;
//   description: string;
//   amount: number;
//   category: ExpenseCategory;
//   tripId?: number;
// }

// export enum ExpenseCategory {
//     FUEL,
//     TOLL,
//     OTHERS
// }