from fastapi import FastAPI
from sqlalchemy import text

from app.db.database import engine

app = FastAPI(
    title="FinPilot API",
    description="Personal Finance and Budget Management Platform",
    version="1.0.0",
)


@app.get("/")
def health_check():
    return {"message": "FinPilot API is running successfully"}


@app.get("/db-test")
def test_database():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        version = result.fetchone()[0]

    return {"database_status": "connected", "postgres_version": version}