import uuid
import cloudinary
import cloudinary.uploader
from fastapi import APIRouter, UploadFile, File, Depends
from app.core.dependencies import get_current_admin
from app.core.config import settings

router = APIRouter(prefix="/upload", tags=["Upload"])

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)

@router.post("/")
def upload_file(
    file: UploadFile = File(...),
    current_admin: str = Depends(get_current_admin)
):
    ext = file.filename.split(".")[-1].lower()
    resource_type = "raw" if ext in ["pdf", "doc", "docx", "zip"] else "auto"

    if resource_type == "raw":
        unique_id = f"{uuid.uuid4().hex}.{ext}"
        result = cloudinary.uploader.upload(
            file.file,
            resource_type="raw",
            public_id=unique_id,
        )
    else:
        result = cloudinary.uploader.upload(
            file.file,
            resource_type="auto",
        )

    return {"file_url": result["secure_url"]}