from fastapi import FastAPI

app = FastAPI(
    title="FinPilot API",
    description="Personal Finance and Budget Management Platform",
    version="1.0.0",
)


@app.get("/")
def health_check():
    return {"message": "FinPilot API is running successfully"}