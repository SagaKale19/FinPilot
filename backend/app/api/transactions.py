from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.auth import get_current_user
from app.db.database import get_db
from app.schemas.transaction import TransactionCreate, TransactionResponse, TransactionUpdate
from app.services.transaction_service import (
    create_transaction,
    get_user_transactions,
    get_transaction_by_id,
    update_transaction,
    delete_transaction,
)

router = APIRouter(prefix="/transactions", tags=["Transactions"])


@router.post("/", response_model=TransactionResponse)
def add_transaction(
    transaction_data: TransactionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_transaction(db, transaction_data, current_user.id)


@router.get("/", response_model=List[TransactionResponse])
def list_transactions(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_user_transactions(db, current_user.id)


@router.get("/{transaction_id}", response_model=TransactionResponse)
def get_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    transaction = get_transaction_by_id(db, transaction_id, current_user.id)

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found",
        )

    return transaction


@router.put("/{transaction_id}", response_model=TransactionResponse)
def edit_transaction(
    transaction_id: int,
    transaction_data: TransactionUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    transaction = get_transaction_by_id(db, transaction_id, current_user.id)

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found",
        )

    return update_transaction(db, transaction, transaction_data)


@router.delete("/{transaction_id}")
def remove_transaction(
    transaction_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    transaction = get_transaction_by_id(db, transaction_id, current_user.id)

    if not transaction:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Transaction not found",
        )

    return delete_transaction(db, transaction)