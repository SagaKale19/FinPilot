import { useEffect, useState } from "react";
import { api } from "../api/api";

type DashboardSummary = {
  total_income: number;
  total_expense: number;
  balance: number;
  transaction_count: number;
};

type Transaction = {
  id: number;
  amount: string;
  type: string;
  category: string;
  description: string | null;
  transaction_date: string;
};

function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [category, setCategory] = useState("Food");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("2026-06-30");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const summaryResponse = await api.get("/dashboard/summary", { headers });
      const transactionsResponse = await api.get("/transactions/", { headers });

      setSummary(summaryResponse.data);
      setTransactions(transactionsResponse.data);
    };

    fetchData();
  }, []);

  const addTransaction = async () => {
  const token = localStorage.getItem("token");

  await api.post(
    "/transactions/",
    {
      amount: Number(amount),
      type,
      category,
      description,
      transaction_date: date,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  window.location.reload();
};

  return (
    <div>
      <h1>FinPilot Dashboard</h1>

      {summary && (
        <div>
          <p>Total Income: €{summary.total_income}</p>
          <p>Total Expense: €{summary.total_expense}</p>
          <p>Balance: €{summary.balance}</p>
          <p>Transactions: {summary.transaction_count}</p>
        </div>
      )}

      <h2>Add Transaction</h2>

<input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

<select value={type} onChange={(e) => setType(e.target.value)}>
  <option value="income">Income</option>
  <option value="expense">Expense</option>
</select>

<select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="Salary">Salary</option>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Shopping">Shopping</option>
  <option value="Bills">Bills</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Health">Health</option>
  <option value="Education">Education</option>
  <option value="Other">Other</option>
</select>

<input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

<button onClick={addTransaction}>Add Transaction</button>

      <h2>Transactions</h2>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>€{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category}</td>
              <td>{transaction.description}</td>
              <td>{transaction.transaction_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;