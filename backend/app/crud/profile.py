from sqlalchemy.orm import Session
from app.db.models import Profile

def get_profile(db: Session):
    profile = db.query(Profile).filter(Profile.id == 1).first()
    if not profile:
        profile = Profile(id=1, about_text="", resume_url="", photo_url="")
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

def update_profile(db: Session, data: dict):
    profile = get_profile(db)
    for key, value in data.items():
        setattr(profile, key, value)
    db.commit()
    db.refresh(profile)
    return profile