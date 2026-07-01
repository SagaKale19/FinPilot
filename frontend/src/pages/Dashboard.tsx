import { useEffect, useState } from "react";
import { api } from "../api/api";
import SummaryCards from "../components/SummaryCards";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionTable from "../components/TransactionTable";
import type { DashboardSummary, Transaction } from "../types/finance";

function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("2026-06-30");
  const [editingId, setEditingId] = useState<number | null>(null);
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const summaryResponse = await api.get("/dashboard/summary", { headers });
    const transactionsResponse = await api.get("/transactions/", { headers });

    setSummary(summaryResponse.data);
    setTransactions(transactionsResponse.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

const addTransaction = async () => {
  const token = localStorage.getItem("token");

  const payload = {
    amount: Number(amount),
    type,
    category,
    description,
    transaction_date: date,
  };

  if (editingId) {
    await api.put(`/transactions/${editingId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEditingId(null);
  } else {
    await api.post("/transactions/", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setAmount("");
  setDescription("");
  fetchData();
};

  const deleteTransaction = async (id: number) => {
    const token = localStorage.getItem("token");

    await api.delete(`/transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchData();
  };

  const startEdit = (transaction: Transaction) => {
  setEditingId(transaction.id);
  setAmount(transaction.amount);
  setType(transaction.type);
  setCategory(transaction.category);
  setDescription(transaction.description || "");
  setDate(transaction.transaction_date);
};

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="mb-8 flex items-center justify-between bg-white px-8 py-5 shadow">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FinPilot</h1>
          <p className="text-sm text-gray-500">Personal Finance Dashboard</p>
        </div>

        <button
          className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </header>

      <main className="px-8 pb-8">
        {summary && <SummaryCards summary={summary} />}

        <AddTransactionForm
          amount={amount}
          type={type}
          category={category}
          description={description}
          date={date}
          setAmount={setAmount}
          setType={setType}
          setCategory={setCategory}
          setDescription={setDescription}
          setDate={setDate}
          addTransaction={addTransaction}
          buttonText={editingId ? "Update Transaction" : "Add Transaction"}
        />

        <TransactionTable
  transactions={transactions}
  onDelete={deleteTransaction}
  onEdit={startEdit}
/>
      </main>
    </div>
  );
}

export default Dashboard;