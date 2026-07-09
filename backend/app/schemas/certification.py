from pydantic import BaseModel
from typing import Optional

class CertificationBase(BaseModel):
    title: str
    issuer: str
    issuer_logo_url: Optional[str] = None
    date: Optional[str] = None
    credential_url: Optional[str] = None
    image_url: Optional[str] = None

class CertificationCreate(CertificationBase):
    pass

class CertificationUpdate(CertificationBase):
    pass

class CertificationResponse(CertificationBase):
    id: int
    class Config:
        from_attributes = True