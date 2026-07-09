from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.skill import SkillCreate, SkillUpdate, SkillResponse
from app.crud import skill as skill_crud
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/skills", tags=["Skills"])

@router.get("/", response_model=List[SkillResponse])
def read_skills(db: Session = Depends(get_db)):
    return skill_crud.get_skills(db)

@router.get("/{skill_id}", response_model=SkillResponse)
def read_skill(skill_id: int, db: Session = Depends(get_db)):
    db_skill = skill_crud.get_skill(db, skill_id)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return db_skill

@router.post("/", response_model=SkillResponse)
def create_skill(
    skill: SkillCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    return skill_crud.create_skill(db, skill)

@router.put("/{skill_id}", response_model=SkillResponse)
def update_skill(
    skill_id: int,
    skill: SkillUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_skill = skill_crud.update_skill(db, skill_id, skill)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return db_skill

@router.delete("/{skill_id}")
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_skill = skill_crud.delete_skill(db, skill_id)
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"message": "Skill deleted successfully"}