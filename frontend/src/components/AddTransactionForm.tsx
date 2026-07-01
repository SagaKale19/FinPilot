type Props = {
  amount: string;
  type: string;
  category: string;
  description: string;
  date: string;
  setAmount: (value: string) => void;
  setType: (value: string) => void;
  setCategory: (value: string) => void;
  setDescription: (value: string) => void;
  setDate: (value: string) => void;
  addTransaction: () => void;
  buttonText: string;
};

function AddTransactionForm({
  amount,
  type,
  category,
  description,
  date,
  setAmount,
  setType,
  setCategory,
  setDescription,
  setDate,
  addTransaction,
  buttonText,
}: Props) {
  return (
    <div className="mb-8 rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Add Transaction</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <input className="rounded-lg border p-2" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select className="rounded-lg border p-2" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select className="rounded-lg border p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
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

        <input className="rounded-lg border p-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input className="rounded-lg border p-2" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={addTransaction}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default AddTransactionForm;