from datetime import date
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel


class TransactionCreate(BaseModel):
    amount: Decimal
    type: str
    category: str
    description: Optional[str] = None
    transaction_date: date


class TransactionResponse(BaseModel):
    id: int
    amount: Decimal
    type: str
    category: str
    description: Optional[str]
    transaction_date: date

    class Config:
        from_attributes = True

class TransactionUpdate(BaseModel):
    amount: Optional[Decimal] = None
    type: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    transaction_date: Optional[date] = None