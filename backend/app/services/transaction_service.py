from sqlalchemy.orm import Session

from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionUpdate


def create_transaction(db: Session, transaction_data: TransactionCreate, user_id: int):
    new_transaction = Transaction(
        user_id=user_id,
        amount=transaction_data.amount,
        type=transaction_data.type,
        category=transaction_data.category,
        description=transaction_data.description,
        transaction_date=transaction_data.transaction_date,
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)

    return new_transaction


def get_user_transactions(
    db: Session,
    user_id: int,
    transaction_type=None,
    category=None,
    start_date=None,
    end_date=None,
):
    query = db.query(Transaction).filter(Transaction.user_id == user_id)

    if transaction_type:
        query = query.filter(Transaction.type == transaction_type)

    if category:
        query = query.filter(Transaction.category == category)

    if start_date:
        query = query.filter(Transaction.transaction_date >= start_date)

    if end_date:
        query = query.filter(Transaction.transaction_date <= end_date)

    return query.order_by(Transaction.transaction_date.desc()).all()


def get_transaction_by_id(db: Session, transaction_id: int, user_id: int):
    return (
        db.query(Transaction)
        .filter(Transaction.id == transaction_id, Transaction.user_id == user_id)
        .first()
    )


def update_transaction(db: Session, transaction, update_data: TransactionUpdate):
    update_fields = update_data.model_dump(exclude_unset=True)

    for key, value in update_fields.items():
        setattr(transaction, key, value)

    db.commit()
    db.refresh(transaction)

    return transaction


def delete_transaction(db: Session, transaction):
    db.delete(transaction)
    db.commit()

    return {"message": "Transaction deleted successfully"}