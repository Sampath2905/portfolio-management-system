import json
from sqlalchemy.orm import Session
from app.db.models import Project
from app.schemas.project import ProjectCreate, ProjectUpdate

def _serialize(project: Project):
    project.image_urls = json.loads(project.image_urls) if project.image_urls else []
    return project

def get_projects(db: Session):
    projects = db.query(Project).all()
    return [_serialize(p) for p in projects]

def get_project(db: Session, project_id: int):
    project = db.query(Project).filter(Project.id == project_id).first()
    if project:
        _serialize(project)
    return project

def create_project(db: Session, project: ProjectCreate):
    data = project.dict()
    data["image_urls"] = json.dumps(data.get("image_urls", []))
    db_project = Project(**data)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return _serialize(db_project)

def update_project(db: Session, project_id: int, project: ProjectUpdate):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        return None
    data = project.dict()
    data["image_urls"] = json.dumps(data.get("image_urls", []))
    for key, value in data.items():
        setattr(db_project, key, value)
    db.commit()
    db.refresh(db_project)
    return _serialize(db_project)

def delete_project(db: Session, project_id: int):
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        return None
    db.delete(db_project)
    db.commit()
    return db_project