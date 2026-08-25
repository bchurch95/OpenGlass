from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models

router = APIRouter(prefix="/config-versions", tags=["configs"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/device/{device_id}")
def list_configs(device_id:int, db: Session = Depends(get_db)):
    return db.query(models.ConfigVersion).filter(models.ConfigVersion.device_id == device_id).all()
