from sqlalchemy.orm import Session
from app.db.models import Certification
from app.schemas.certification import CertificationCreate, CertificationUpdate

def get_certifications(db: Session):
    return db.query(Certification).all()

def get_certification(db: Session, certification_id: int):
    return db.query(Certification).filter(Certification.id == certification_id).first()

def create_certification(db: Session, certification: CertificationCreate):
    db_certification = Certification(**certification.dict())
    db.add(db_certification)
    db.commit()
    db.refresh(db_certification)
    return db_certification

def update_certification(db: Session, certification_id: int, certification: CertificationUpdate):
    db_certification = get_certification(db, certification_id)
    if not db_certification:
        return None
    for key, value in certification.dict().items():
        setattr(db_certification, key, value)
    db.commit()
    db.refresh(db_certification)
    return db_certification

def delete_certification(db: Session, certification_id: int):
    db_certification = get_certification(db, certification_id)
    if not db_certification:
        return None
    db.delete(db_certification)
    db.commit()
    return db_certification