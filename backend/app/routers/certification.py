from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.certification import CertificationCreate, CertificationUpdate, CertificationResponse
from app.crud import certification as certification_crud
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/certifications", tags=["Certifications"])

@router.get("/", response_model=List[CertificationResponse])
def read_certifications(db: Session = Depends(get_db)):
    return certification_crud.get_certifications(db)

@router.get("/{certification_id}", response_model=CertificationResponse)
def read_certification(certification_id: int, db: Session = Depends(get_db)):
    db_certification = certification_crud.get_certification(db, certification_id)
    if not db_certification:
        raise HTTPException(status_code=404, detail="Certification not found")
    return db_certification

@router.post("/", response_model=CertificationResponse)
def create_certification(
    certification: CertificationCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    return certification_crud.create_certification(db, certification)

@router.put("/{certification_id}", response_model=CertificationResponse)
def update_certification(
    certification_id: int,
    certification: CertificationUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_certification = certification_crud.update_certification(db, certification_id, certification)
    if not db_certification:
        raise HTTPException(status_code=404, detail="Certification not found")
    return db_certification

@router.delete("/{certification_id}")
def delete_certification(
    certification_id: int,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_certification = certification_crud.delete_certification(db, certification_id)
    if not db_certification:
        raise HTTPException(status_code=404, detail="Certification not found")
    return {"message": "Certification deleted successfully"}