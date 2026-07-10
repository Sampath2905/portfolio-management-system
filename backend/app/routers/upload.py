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

    result = cloudinary.uploader.upload(
        file.file,
        resource_type=resource_type,
    )

    file_url = result["secure_url"]

    # Cloudinary's raw resource URLs don't include the extension by default,
    # which causes browsers to download instead of preview. Append it manually.
    if resource_type == "raw" and not file_url.endswith(f".{ext}"):
        file_url = f"{file_url}.{ext}"

    return {"file_url": file_url}