from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SkillBridge API")

# Allow your React frontend to communicate with this backend
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

# Mock endpoints for your dashboards
@app.get("/api/student")
def get_student_data():
    return {"name": "Aarav Sharma", "verified_skills": 3, "projects": 5}

@app.get("/api/institution")
def get_institution_stats():
    return {"total_students": 1248, "active_opportunities": 38, "placed": 184}