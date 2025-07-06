

'use client';

import { Transaction } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export default function DashboardSummary({ transactions }: { transactions: Transaction[] }) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recent = sorted.slice(0, 3);

  const categoryTotals = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹{total.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Category</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{topCategory ? `${topCategory[0]} (₹${topCategory[1].toFixed(2)})` : 'N/A'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          {recent.length === 0 && <p>No recent transactions</p>}
          {recent.map(tx => (
            <p key={tx.id}>• {tx.description} – ₹{tx.amount} on {format(new Date(tx.date), 'dd MMM')}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}