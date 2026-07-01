from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.dashboard_service import get_dashboard_summary, get_category_spending
from app.api.auth import get_current_user
from app.db.database import get_db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary")
def dashboard_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_dashboard_summary(db, current_user.id)

@router.get("/category-spending")
def category_spending(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_category_spending(db, current_user.id)