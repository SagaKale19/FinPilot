from fastapi import FastAPI
from sqlalchemy import text
from app.api.transactions import router as transactions_router
from app.db.database import engine
from app.api.auth import router as auth_router
from app.api.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="FinPilot API",
    description="Personal Finance and Budget Management Platform",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(transactions_router)
app.include_router(dashboard_router)

@app.get("/")
def health_check():
    return {"message": "FinPilot API is running successfully"}


@app.get("/db-test")
def test_database():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        version = result.fetchone()[0]

    return {"database_status": "connected", "postgres_version": version}