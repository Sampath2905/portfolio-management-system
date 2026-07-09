from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.academic import AcademicCreate, AcademicUpdate, AcademicResponse
from app.crud import academic as academic_crud
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/academics", tags=["Academics"])

@router.get("/", response_model=List[AcademicResponse])
def read_academics(db: Session = Depends(get_db)):
    return academic_crud.get_academics(db)

@router.get("/{academic_id}", response_model=AcademicResponse)
def read_academic(academic_id: int, db: Session = Depends(get_db)):
    db_academic = academic_crud.get_academic(db, academic_id)
    if not db_academic:
        raise HTTPException(status_code=404, detail="Academic record not found")
    return db_academic

@router.post("/", response_model=AcademicResponse)
def create_academic(
    academic: AcademicCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    return academic_crud.create_academic(db, academic)

@router.put("/{academic_id}", response_model=AcademicResponse)
def update_academic(
    academic_id: int,
    academic: AcademicUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_academic = academic_crud.update_academic(db, academic_id, academic)
    if not db_academic:
        raise HTTPException(status_code=404, detail="Academic record not found")
    return db_academic

@router.delete("/{academic_id}")
def delete_academic(
    academic_id: int,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_academic = academic_crud.delete_academic(db, academic_id)
    if not db_academic:
        raise HTTPException(status_code=404, detail="Academic record not found")
    return {"message": "Academic record deleted successfully"}