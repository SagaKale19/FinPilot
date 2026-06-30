from datetime import date
from decimal import Decimal
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class TransactionType(str, Enum):
    income = "income"
    expense = "expense"


class TransactionCategory(str, Enum):
    salary = "Salary"
    food = "Food"
    transport = "Transport"
    shopping = "Shopping"
    bills = "Bills"
    entertainment = "Entertainment"
    health = "Health"
    education = "Education"
    other = "Other"


class TransactionCreate(BaseModel):
    amount: Decimal
    type: TransactionType
    category: TransactionCategory
    description: Optional[str] = None
    transaction_date: date


class TransactionUpdate(BaseModel):
    amount: Optional[Decimal] = None
    type: Optional[TransactionType] = None
    category: Optional[TransactionCategory] = None
    description: Optional[str] = None
    transaction_date: Optional[date] = None


class TransactionResponse(BaseModel):
    id: int
    amount: Decimal
    type: str
    category: str
    description: Optional[str]
    transaction_date: date

    class Config:
        from_attributes = True