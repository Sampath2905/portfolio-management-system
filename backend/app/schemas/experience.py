from pydantic import BaseModel
from typing import Optional

class ExperienceBase(BaseModel):
    company: str
    company_logo_url: Optional[str] = None
    role: str
    duration: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    description: Optional[str] = None

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceUpdate(ExperienceBase):
    pass

class ExperienceResponse(ExperienceBase):
    id: int
    class Config:
        from_attributes = True