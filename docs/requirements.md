# FinPilot - Functional Requirements

## 1. Project Overview

FinPilot is a personal finance and budget management platform that helps users track income, expenses, budgets, savings goals, and monthly financial summaries.

The goal is to build a full-stack software engineering project using Python, FastAPI, PostgreSQL, React, Docker, GitHub Actions, and free cloud deployment.

## 2. Core Modules

### 2.1 Authentication

The system should allow users to:

- Register with name, email, and password.
- Login using email and password.
- Store passwords securely using hashing.
- Access protected features only after login.
- Use JWT authentication for secure API access.

### 2.2 User Profile

The system should allow users to:

- View profile details.
- Update name.
- Change password.

### 2.3 Categories

The system should allow users to:

- Create income categories.
- Create expense categories.
- View all categories.
- Edit categories.
- Delete categories.

Example categories:

- Salary
- Rent
- Food
- Transport
- Shopping
- Bills
- Entertainment

### 2.4 Transactions

The system should allow users to:

- Add income transactions.
- Add expense transactions.
- View all transactions.
- Edit transactions.
- Delete transactions.
- Filter transactions by date.
- Filter transactions by category.
- Filter transactions by type: income or expense.

### 2.5 Budgets

The system should allow users to:

- Create monthly budgets.
- Create category-wise budgets.
- View used budget.
- View remaining budget.
- Show warning when spending reaches 80% of budget.
- Show alert when budget is exceeded.

### 2.6 Dashboard

The dashboard should display:

- Total income.
- Total expenses.
- Current balance.
- Budget remaining.
- Recent transactions.
- Monthly summary.
- Category-wise spending.

### 2.7 Reports

The system should allow users to:

- Generate monthly financial summary.
- Export transactions as CSV.
- View income vs expense summary.

## 3. Out of Scope for Version 1

The following features will not be included in the first version:

- Real bank account integration.
- Real payment processing.
- AI-based predictions.
- Mobile application.
- Multi-user family accounts.
- Paid subscription system.

## 4. Success Criteria

The project will be considered successful when:

- A user can register and login.
- A user can manage income and expenses.
- A user can create budgets.
- A user can view dashboard summaries.
- A user can export basic reports.
- The backend API is documented through Swagger.
- The project is pushed to GitHub.
- The project has Docker support.
- The project has CI/CD using GitHub Actions.
- The project is deployed using free services.