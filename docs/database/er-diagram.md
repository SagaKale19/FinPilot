# FinPilot - Database ER Diagram

## Core Tables

FinPilot Version 1 will use the following main tables:

1. users
2. categories
3. transactions
4. budgets
5. savings_goals

## Entity Relationships

```mermaid
erDiagram
    USERS ||--o{ CATEGORIES : creates
    USERS ||--o{ TRANSACTIONS : owns
    USERS ||--o{ BUDGETS : sets
    USERS ||--o{ SAVINGS_GOALS : creates
    CATEGORIES ||--o{ TRANSACTIONS : classifies
    CATEGORIES ||--o{ BUDGETS : applies_to

    USERS {
        int id PK
        string name
        string email UK
        string password_hash
        datetime created_at
        datetime updated_at
    }

    CATEGORIES {
        int id PK
        int user_id FK
        string name
        string type
        datetime created_at
    }

    TRANSACTIONS {
        int id PK
        int user_id FK
        int category_id FK
        decimal amount
        string type
        string description
        date transaction_date
        datetime created_at
        datetime updated_at
    }

    BUDGETS {
        int id PK
        int user_id FK
        int category_id FK
        decimal limit_amount
        int month
        int year
        datetime created_at
        datetime updated_at
    }

    SAVINGS_GOALS {
        int id PK
        int user_id FK
        string name
        decimal target_amount
        decimal current_amount
        date target_date
        datetime created_at
        datetime updated_at
    }