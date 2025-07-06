// lib/types.ts
export type Category = "Food" | "Rent" | "Travel" | "Shopping" | "Bills" | "Others";

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
  category: Category;
}
