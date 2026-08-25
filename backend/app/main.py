from contextlib import asynccontextmanager
import asyncio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models
from .routers import sites, devices, image_builds, config_versions, builder_templates

async def wait_for_db(max_tries=30, delay=1):
    for i in range(max_tries):
        try:
            with engine.connect() as conn:
                conn.close()
            return
        except Exception:
            if i == max_tries - 1:
                raise
            await asyncio.sleep(delay)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Wait for DB to be reachable before creating tables
    await wait_for_db()
    # Create tables for dev; use Alembic in prod
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(title="OpenGlass API", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sites.router)
app.include_router(devices.router)
app.include_router(image_builds.router)
app.include_router(config_versions.router)
app.include_router(builder_templates.router)

@app.get("/health")
def health():
    return {"status": "ok", "service": "openglass-api"}

@app.get("/")
def root():
    return {"message": "OpenGlass API"}
