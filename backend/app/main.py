from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.db.database import Base, engine
from app.routers import auth, project, academic, certification, experience, skill, upload, profile

app = FastAPI(title="Portfolio Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://portfolio-management-system-two.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router)
app.include_router(project.router)
app.include_router(academic.router)
app.include_router(certification.router)
app.include_router(experience.router)
app.include_router(skill.router)
app.include_router(upload.router)
app.include_router(profile.router)

@app.get("/")
def root():
    return {"message": "Portfolio backend is running"}