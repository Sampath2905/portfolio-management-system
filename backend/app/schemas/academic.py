from pydantic import BaseModel
from typing import Optional

class AcademicBase(BaseModel):
    institution: str
    institution_logo_url: Optional[str] = None
    degree: str
    year: str
    grade: Optional[str] = None

class AcademicCreate(AcademicBase):
    pass

class AcademicUpdate(AcademicBase):
    pass

class AcademicResponse(AcademicBase):
    id: int
    class Config:
        from_attributes = True