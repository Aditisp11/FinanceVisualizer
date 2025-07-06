'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '@/lib/types';

const COLORS = ['#6366f1', '#f97316', '#22c55e', '#e11d48', '#06b6d4', '#a855f7'];

export default function CategoryPieChart({ transactions }: { transactions: Transaction[] }) {

  const grouped = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

 
  const chartData = Object.entries(grouped).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="w-full h-[320px]">
      {chartData.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center mt-10">No category data available</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
