from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.profile import ProfileUpdate, ProfileResponse
from app.crud import profile as profile_crud
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("/", response_model=ProfileResponse)
def read_profile(db: Session = Depends(get_db)):
    return profile_crud.get_profile(db)

@router.put("/", response_model=ProfileResponse)
def update_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    return profile_crud.update_profile(db, data.dict())