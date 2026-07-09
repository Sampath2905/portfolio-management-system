from pydantic import BaseModel
from typing import Optional

class ProfileBase(BaseModel):
    about_text: Optional[str] = None
    resume_url: Optional[str] = None
    photo_url: Optional[str] = None

class ProfileUpdate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: int

    class Config:
        from_attributes = True