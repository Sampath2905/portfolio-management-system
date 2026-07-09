from sqlalchemy import Column, Integer, String, Text
from app.db.database import Base

class Academic(Base):
    __tablename__ = "academics"
    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String(255), nullable=False)
    institution_logo_url = Column(String(500))
    degree = Column(String(255), nullable=False)
    year = Column(String(50), nullable=False)
    grade = Column(String(50))

class Certification(Base):
    __tablename__ = "certifications"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    issuer = Column(String(255), nullable=False)
    issuer_logo_url = Column(String(500))
    date = Column(String(50))
    credential_url = Column(String(500))
    image_url = Column(String(500))

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    tech_stack = Column(String(500))
    github_url = Column(String(500))
    live_url = Column(String(500))
    image_urls = Column(Text)  # will store JSON array as string, e.g. ["/uploads/a.jpg","/uploads/b.jpg"]

class Experience(Base):
    __tablename__ = "experience"
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(255), nullable=False)
    company_logo_url = Column(String(500))
    role = Column(String(255), nullable=False)
    duration = Column(String(100))
    address = Column(String(255))
    city = Column(String(100))
    country = Column(String(100))
    description = Column(Text)

class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(100))
    proficiency = Column(Integer)  # 1-100

class Profile(Base):
    __tablename__ = "profile"
    id = Column(Integer, primary_key=True, index=True)
    about_text = Column(Text)
    resume_url = Column(String(500))
    photo_url = Column(String(500))