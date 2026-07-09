from sqlalchemy.orm import Session
from app.db.models import Experience
from app.schemas.experience import ExperienceCreate, ExperienceUpdate

def get_experiences(db: Session):
    return db.query(Experience).all()

def get_experience(db: Session, experience_id: int):
    return db.query(Experience).filter(Experience.id == experience_id).first()

def create_experience(db: Session, experience: ExperienceCreate):
    db_experience = Experience(**experience.dict())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience

def update_experience(db: Session, experience_id: int, experience: ExperienceUpdate):
    db_experience = get_experience(db, experience_id)
    if not db_experience:
        return None
    for key, value in experience.dict().items():
        setattr(db_experience, key, value)
    db.commit()
    db.refresh(db_experience)
    return db_experience

def delete_experience(db: Session, experience_id: int):
    db_experience = get_experience(db, experience_id)
    if not db_experience:
        return None
    db.delete(db_experience)
    db.commit()
    return db_experience