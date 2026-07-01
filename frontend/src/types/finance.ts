export type DashboardSummary = {
  total_income: number;
  total_expense: number;
  balance: number;
  transaction_count: number;
};

export type Transaction = {
  id: number;
  amount: string;
  type: string;
  category: string;
  description: string | null;
  transaction_date: string;
};