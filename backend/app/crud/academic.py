from sqlalchemy.orm import Session
from app.db.models import Academic
from app.schemas.academic import AcademicCreate, AcademicUpdate

def get_academics(db: Session):
    return db.query(Academic).all()

def get_academic(db: Session, academic_id: int):
    return db.query(Academic).filter(Academic.id == academic_id).first()

def create_academic(db: Session, academic: AcademicCreate):
    db_academic = Academic(**academic.dict())
    db.add(db_academic)
    db.commit()
    db.refresh(db_academic)
    return db_academic

def update_academic(db: Session, academic_id: int, academic: AcademicUpdate):
    db_academic = get_academic(db, academic_id)
    if not db_academic:
        return None
    for key, value in academic.dict().items():
        setattr(db_academic, key, value)
    db.commit()
    db.refresh(db_academic)
    return db_academic

def delete_academic(db: Session, academic_id: int):
    db_academic = get_academic(db, academic_id)
    if not db_academic:
        return None
    db.delete(db_academic)
    db.commit()
    return db_academic