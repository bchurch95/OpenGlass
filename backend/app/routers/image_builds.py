from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models

router = APIRouter(prefix="/image-builds", tags=["images"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def list_builds(db: Session = Depends(get_db)):
    return db.query(models.ImageBuild).all()

@router.post("/")
def create_build(data: dict, db: Session = Depends(get_db)):
    build = models.ImageBuild(**data)
    db.add(build)
    db.commit()
    db.refresh(build)
    return build
