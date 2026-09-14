from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="SkillBridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "SkillBridge API is LIVE! 🚀"}

@app.get("/api/student")
def get_student_data():
    return {
        "name": "Aarav Sharma",
        "college": "Computer Science Engineering • 3rd Year • Tech College",
        "verified_skills": 3,
        "certifications": 2,
        "projects": 5,
        "skills": [
            {"name": "Python", "progress": 85, "level": "Advanced"},
            {"name": "Java", "progress": 70, "level": "Intermediate"},
            {"name": "SQL", "progress": 65, "level": "Intermediate"},
            {"name": "Communication", "progress": 90, "level": "Expert"},
            {"name": "React", "progress": 60, "level": "Basic"}
        ]
    }

@app.get("/api/institution")
def get_institution_data():
    return {
        "total_students": 1248,
        "active_opportunities": 38,
        "placed": 184,
        "placement_rate": "84%"
    }

@app.get("/api/company")
def get_company_data():
    return {
        "active_openings": 6,
        "total_applicants": 42,
        "shortlisted": 12,
        "interviews_scheduled": 5
    }
