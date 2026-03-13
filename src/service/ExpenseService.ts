const BASE_URL = 'http://localhost:8080/api/expenses';

export interface Expense {
  expenseId: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  tripId?: number;
}

export enum ExpenseCategory {
    FUEL,
    TOLL,
    OTHERS
}


export const getExpense = (id: number): Promise<Expense> => {
    return fetch(`${BASE_URL}/${id}`, {
        credentials: 'include'
    }).then(res => res.json());
};


export const getAllExpenses = (): Promise<Expense[]> => {
    return fetch(`${BASE_URL}`, {
        credentials: 'include'
    }).then(res => res.json());
};


export const createExpense = (expense: Expense): Promise<Expense> => {
  return fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
    credentials: 'include'
  }).then(res => res.json());
};


export const updateExpense = (expense: Expense): Promise<Expense> => {
  return fetch(`${BASE_URL}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
    credentials: 'include'
  }).then(res => res.json());
};


export const deleteExpense = (expense: Expense): Promise<void> => {
  return fetch(`${BASE_URL}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
    credentials: 'include'
  }).then(res => {
    if (!res.ok) throw new Error('Failed to delete expense');
  });
};