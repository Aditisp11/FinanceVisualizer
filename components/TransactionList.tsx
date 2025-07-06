

import { Button } from "@/components/ui/button";
import { Transaction } from "@/lib/types";
import { format } from "date-fns";

export default function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="mt-4 space-y-2">
      {transactions.map(tx => (
        <div key={tx.id} className="flex justify-between p-3 bg-muted rounded-lg shadow-sm">
          <div>
            <p className="font-semibold">{tx.description}</p>
            <p className="text-sm text-muted-foreground">
              ₹{tx.amount} on {format(new Date(tx.date), 'dd MMM yyyy')}
            </p>
          </div>
          <div className="space-x-2">
            <Button size="sm" onClick={() => onEdit(tx)}>Edit</Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(tx.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
