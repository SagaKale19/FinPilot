# FinPilot - Initial API Specification

## Base URL

```
http://127.0.0.1:8000
```

---

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login user |
| GET | /auth/me | Get logged-in user |

---

## Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /categories | Create category |
| GET | /categories | Get all categories |
| PUT | /categories/{id} | Update category |
| DELETE | /categories/{id} | Delete category |

---

## Transactions

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /transactions | Add transaction |
| GET | /transactions | Get all transactions |
| GET | /transactions/{id} | Get one transaction |
| PUT | /transactions/{id} | Update transaction |
| DELETE | /transactions/{id} | Delete transaction |

---

## Budgets

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /budgets | Create budget |
| GET | /budgets | Get budgets |
| PUT | /budgets/{id} | Update budget |
| DELETE | /budgets/{id} | Delete budget |

---

## Dashboard

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /dashboard/summary | Dashboard summary |
| GET | /dashboard/category-spending | Spending by category |

---

## Reports

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /reports/monthly | Monthly report |
| GET | /reports/export-csv | Export CSV |