import type { Transaction } from "../types/finance";

type Props = {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  onEdit: (transaction: Transaction) => void;
};

function TransactionTable({ transactions, onDelete, onEdit }: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Transactions</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50 text-left">
            <th className="p-3">Amount</th>
            <th className="p-3">Type</th>
            <th className="p-3">Category</th>
            <th className="p-3">Description</th>
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="p-3">€{transaction.amount}</td>
              <td className="p-3 capitalize">{transaction.type}</td>
              <td className="p-3">{transaction.category}</td>
              <td className="p-3">{transaction.description}</td>
              <td className="p-3">{transaction.transaction_date}</td>
              <td className="p-3 space-x-2">
                <button
                    className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                    onClick={() => onEdit(transaction)}
                >
                    Edit
                </button>

                <button
                    className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    onClick={() => onDelete(transaction.id)}
                >
                    Delete
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;