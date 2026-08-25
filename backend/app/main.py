from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models
from .routers import sites, devices

app = FastAPI(title="OpenGlass API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sites.router)
app.include_router(devices.router)

@app.on_event("startup")
def startup():
    # Create tables for dev; use Alembic in prod
    Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"status": "ok", "service": "openglass-api"}

@app.get("/")
def root():
    return {"message": "OpenGlass API"}
