from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.experience import ExperienceCreate, ExperienceUpdate, ExperienceResponse
from app.crud import experience as experience_crud
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/experience", tags=["Experience"])

@router.get("/", response_model=List[ExperienceResponse])
def read_experiences(db: Session = Depends(get_db)):
    return experience_crud.get_experiences(db)

@router.get("/{experience_id}", response_model=ExperienceResponse)
def read_experience(experience_id: int, db: Session = Depends(get_db)):
    db_experience = experience_crud.get_experience(db, experience_id)
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return db_experience

@router.post("/", response_model=ExperienceResponse)
def create_experience(
    experience: ExperienceCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    return experience_crud.create_experience(db, experience)

@router.put("/{experience_id}", response_model=ExperienceResponse)
def update_experience(
    experience_id: int,
    experience: ExperienceUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_experience = experience_crud.update_experience(db, experience_id, experience)
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return db_experience

@router.delete("/{experience_id}")
def delete_experience(
    experience_id: int,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_experience = experience_crud.delete_experience(db, experience_id)
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    return {"message": "Experience deleted successfully"}