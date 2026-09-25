import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import auth, dashboard, optimizer, dispatch, freight,weather,audit

app = FastAPI(title="Sahayak Rail API", version="0.1.0-prototype")

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins] + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(optimizer.router)
app.include_router(dispatch.router)
app.include_router(freight.router)
app.include_router(weather.router)
app.include_router(audit.router)


@app.get("/")
async def root():
    return {"service": "Sahayak Rail API", "status": "ok", "docs": "/docs"}


@app.get("/api/health")
async def health():
    return {"status": "healthy"}