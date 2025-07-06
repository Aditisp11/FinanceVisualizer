

'use client';

import { useState } from 'react';
import { Transaction, Category } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const categories: Category[] = ["Food", "Rent", "Travel", "Shopping", "Bills", "Others"];

export default function BudgetInsights({ transactions }: { transactions: Transaction[] }) {
  const [budgets, setBudgets] = useState<Record<Category, number>>({
    Food: 0, Rent: 0, Travel: 0, Shopping: 0, Bills: 0, Others: 0
  });

  const handleBudgetChange = (category: Category, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setBudgets(prev => ({ ...prev, [category]: num }));
    }
  };

  const spent: Record<Category, number> = categories.reduce((acc, cat) => {
    acc[cat] = transactions
      .filter(tx => tx.category === cat)
      .reduce((sum, tx) => sum + tx.amount, 0);
    return acc;
  }, {} as Record<Category, number>);

  const chartData = categories.map(cat => ({
    category: cat,
    Budget: budgets[cat],
    Spent: spent[cat] || 0,
  }));

  const overspent = categories.filter(cat => spent[cat] > budgets[cat]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Set Monthly Budgets</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map(cat => (
            <div key={cat} className="space-y-1">
              <label className="text-sm font-medium">{cat}</label>
              <Input
                type="number"
                value={budgets[cat] || ''}
                onChange={e => handleBudgetChange(cat, e.target.value)}
                placeholder="₹"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Budget vs Actual</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(v: number) => `₹${v}`} />
              <Bar dataKey="Budget" fill="#22c55e" />
              <Bar dataKey="Spent" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Spending Insights</CardTitle></CardHeader>
        <CardContent>
          {overspent.length === 0 ? (
            <p className="text-sm text-muted-foreground">All categories are within budget 🎉</p>
          ) : (
            <ul className="list-disc list-inside text-sm text-destructive">
              {overspent.map(cat => (
                <li key={cat}>Overspent in {cat}: ₹{spent[cat] - budgets[cat]}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
