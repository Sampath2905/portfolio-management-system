import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File, Depends
from app.core.dependencies import get_current_admin

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".pdf", ".gif", ".doc", ".docx"}

@router.post("/")
def upload_file(
    file: UploadFile = File(...),
    current_admin: str = Depends(get_current_admin)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return {"error": "File type not allowed"}

    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    file_url = f"/uploads/{unique_name}"
    return {"file_url": file_url}