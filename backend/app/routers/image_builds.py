from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models
from ..schemas_image import ImageBuildCreate
import time

router = APIRouter(prefix="/image-builds", tags=["images"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def simulate_build(build_id: int):
    db = SessionLocal()
    try:
        build = db.query(models.ImageBuild).filter(models.ImageBuild.id == build_id).first()
        if not build:
            return
        build.status = "building"
        db.commit()
        time.sleep(2)
        build.status = "done"
        build.artifact_url = f"/artifacts/{build.id}.bin"
        db.commit()
    finally:
        db.close()

@router.get("/")
def list_builds(db: Session = Depends(get_db)):
    return db.query(models.ImageBuild).all()

@router.post("/")
def create_build(payload: ImageBuildCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    build = models.ImageBuild(**payload.model_dump(), status="pending")
    db.add(build)
    db.commit()
    db.refresh(build)
    background_tasks.add_task(simulate_build, build.id)
    return build
