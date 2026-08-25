from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models, schemas

router = APIRouter(prefix="/sites", tags=["sites"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schemas.SiteRead])
def list_sites(db: Session = Depends(get_db)):
    return db.query(models.Site).all()

@router.post("/", response_model=schemas.SiteRead)
def create_site(site: schemas.SiteCreate, db: Session = Depends(get_db)):
    db_site = models.Site(**site.model_dump())
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site

@router.get("/{site_id}", response_model=schemas.SiteRead)
def get_site(site_id: int, db: Session = Depends(get_db)):
    site = db.query(models.Site).filter(models.Site.id == site_id).first()
    if not site:
        raise HTTPException(404, "Site not found")
    return site
