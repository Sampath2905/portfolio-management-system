from pydantic import BaseModel
from typing import Optional, List

class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    tech_stack: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_urls: Optional[List[str]] = []

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    tech_stack: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    image_urls: Optional[List[str]] = []

    class Config:
        from_attributes = True