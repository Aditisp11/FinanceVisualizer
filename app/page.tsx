
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/MonthlyChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import DashboardSummary from '@/components/DashboardSummary';
import BudgetInsights from '@/components/BudgetInsights';
import { Transaction } from '@/lib/types';

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editData, setEditData] = useState<Transaction | null>(null);

  const handleSubmit = (data: Transaction) => {
    if (editData) {
      setTransactions(prev => prev.map(tx => (tx.id === data.id ? data : tx)));
      setEditData(null);
    } else {
      setTransactions(prev => [...prev, data]);
    }
  };

  const handleEdit = (tx: Transaction) => setEditData(tx);
  const handleDelete = (id: number) => setTransactions(prev => prev.filter(tx => tx.id !== id));

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10 min-h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
      <h1 className="text-5xl font-extrabold text-center text-indigo-800 dark:text-indigo-300 mb-10 tracking-wide drop-shadow-md"> Personal Finance Dashboard</h1>

      <Card className="bg-gradient-to-br from-white via-indigo-50 to-white/90 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 border border-indigo-100 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-indigo-900 dark:text-indigo-200">➕ Add Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm onSubmit={handleSubmit} editData={editData} />
        </CardContent>
      </Card>

      <DashboardSummary transactions={transactions} />

      <Card className="bg-gradient-to-br from-white via-blue-50 to-white/90 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-indigo-900 dark:text-indigo-200">Monthly Expense Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyChart transactions={transactions} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white via-pink-50 to-white/90 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 border border-pink-100 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-indigo-900 dark:text-indigo-200">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryPieChart transactions={transactions} />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white via-green-50 to-white/90 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 backdrop-blur shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-100 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-indigo-900 dark:text-indigo-200">All Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
        </CardContent>
      </Card>

      <BudgetInsights transactions={transactions} />
    </div>
  );
}
