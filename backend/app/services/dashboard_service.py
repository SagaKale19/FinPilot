from decimal import Decimal

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.transaction import Transaction


def get_dashboard_summary(db: Session, user_id: int):
    total_income = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0))
        .filter(Transaction.user_id == user_id, Transaction.type == "income")
        .scalar()
    )

    total_expense = (
        db.query(func.coalesce(func.sum(Transaction.amount), 0))
        .filter(Transaction.user_id == user_id, Transaction.type == "expense")
        .scalar()
    )

    transaction_count = (
        db.query(func.count(Transaction.id))
        .filter(Transaction.user_id == user_id)
        .scalar()
    )

    balance = Decimal(total_income) - Decimal(total_expense)

    return {
        "total_income": total_income,
        "total_expense": total_expense,
        "balance": balance,
        "transaction_count": transaction_count,
    }

def get_category_spending(db: Session, user_id: int):
    results = (
        db.query(
            Transaction.category,
            func.sum(Transaction.amount).label("total")
        )
        .filter(
            Transaction.user_id == user_id,
            Transaction.type == "expense"
        )
        .group_by(Transaction.category)
        .all()
    )

    return [
        {
            "category": category,
            "total": total
        }
        for category, total in results
    ]