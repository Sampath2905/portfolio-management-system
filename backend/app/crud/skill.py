from sqlalchemy.orm import Session
from app.db.models import Skill
from app.schemas.skill import SkillCreate, SkillUpdate

def get_skills(db: Session):
    return db.query(Skill).all()

def get_skill(db: Session, skill_id: int):
    return db.query(Skill).filter(Skill.id == skill_id).first()

def create_skill(db: Session, skill: SkillCreate):
    db_skill = Skill(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

def update_skill(db: Session, skill_id: int, skill: SkillUpdate):
    db_skill = get_skill(db, skill_id)
    if not db_skill:
        return None
    for key, value in skill.dict().items():
        setattr(db_skill, key, value)
    db.commit()
    db.refresh(db_skill)
    return db_skill

def delete_skill(db: Session, skill_id: int):
    db_skill = get_skill(db, skill_id)
    if not db_skill:
        return None
    db.delete(db_skill)
    db.commit()
    return db_skill