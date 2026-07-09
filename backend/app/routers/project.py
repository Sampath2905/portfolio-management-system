from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.crud import project as project_crud
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/projects", tags=["Projects"])

# Public - anyone can view
@router.get("/", response_model=List[ProjectResponse])
def read_projects(db: Session = Depends(get_db)):
    return project_crud.get_projects(db)

@router.get("/{project_id}", response_model=ProjectResponse)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = project_crud.get_project(db, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

# Protected - only logged-in admin
@router.post("/", response_model=ProjectResponse)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    return project_crud.create_project(db, project)

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_project = project_crud.update_project(db, project_id, project)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@router.delete("/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_admin: str = Depends(get_current_admin)
):
    db_project = project_crud.delete_project(db, project_id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}