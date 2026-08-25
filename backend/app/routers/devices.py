from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models, schemas

router = APIRouter(prefix="/devices", tags=["devices"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.DeviceRead])
def list_devices(db: Session = Depends(get_db)):
    return db.query(models.Device).all()

@router.post("/", response_model=schemas.DeviceRead)
def create_device(device: schemas.DeviceCreate, db: Session = Depends(get_db)):
    db_device = models.Device(**device.model_dump())
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device

@router.get("/{device_id}", response_model=schemas.DeviceRead)
def get_device(device_id: int, db: Session = Depends(get_db)):
    dev = db.query(models.Device).filter(models.Device.id == device_id).first()
    if not dev:
        raise HTTPException(404, "Device not found")
    return dev
