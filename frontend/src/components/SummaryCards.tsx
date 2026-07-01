import type { DashboardSummary } from "../types/finance";

type Props = {
  summary: DashboardSummary;
};

function SummaryCards({ summary }: Props) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Total Income</p>
        <p className="text-2xl font-bold text-green-600">€{summary.total_income}</p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Total Expense</p>
        <p className="text-2xl font-bold text-red-600">€{summary.total_expense}</p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Balance</p>
        <p className="text-2xl font-bold text-blue-600">€{summary.balance}</p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <p className="text-sm text-gray-500">Transactions</p>
        <p className="text-2xl font-bold text-gray-900">{summary.transaction_count}</p>
      </div>
    </div>
  );
}

export default SummaryCards;