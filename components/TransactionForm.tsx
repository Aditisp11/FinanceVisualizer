
'use client';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Transaction, Category } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const categories: Category[] = ["Food", "Rent", "Travel", "Shopping", "Bills", "Others"];

export default function TransactionForm({
  onSubmit,
  editData,
}: {
  onSubmit: (data: Transaction) => void;
  editData: Transaction | null;
}) {
  const [form, setForm] = useState({ amount: '', description: '', date: '', category: '' });

  useEffect(() => {
    if (editData) {
      setForm({
        amount: editData.amount.toString(),
        description: editData.description,
        date: editData.date,
        category: editData.category,
      });
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { amount, description, date, category } = form;
    if (!amount || !description || !date || !category || isNaN(Number(amount))) {
      alert('Please fill all fields correctly.');
      return;
    }

    const data: Transaction = {
      id: editData?.id ?? Date.now(),
      amount: parseFloat(amount),
      description,
      date,
      category: category as Category,
    };

    onSubmit(data);
    setForm({ amount: '', description: '', date: '', category: '' });
  };

  return (
    <div className="space-y-3">
      <Input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
      <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <Input name="date" type="date" value={form.date} onChange={handleChange} />
      <div>
        <Label>Category</Label>
        <Select value={form.category} onValueChange={(val) => setForm(prev => ({ ...prev, category: val }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSubmit}>{editData ? "Update" : "Add"} Transaction</Button>
    </div>
  );
}
