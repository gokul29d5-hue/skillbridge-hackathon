import os
import json
import random
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import google.generativeai as genai

# Import the database and security files
from database import SessionLocal, engine, UserDB, Opportunity
from security import get_password_hash, verify_password

app = FastAPI(title="SkillBridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI using environment variable safely
genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "your-api-key-here"))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- AUTO-CREATE SUPER ADMIN ---
@app.on_event("startup")
def setup_super_admin():
    db = SessionLocal()
    admin = db.query(UserDB).filter(UserDB.email == "admin@skillbridge.com").first()
    if not admin:
        hashed_pw = get_password_hash("superadmin123")
        new_admin = UserDB(
            name="SkillBridge Owner", 
            email="admin@skillbridge.com", 
            hashed_password=hashed_pw, 
            role="superadmin"
        )
        db.add(new_admin)
        db.commit()
    db.close()

# ==========================================
# PYDANTIC SCHEMAS (Data Validation)
# ==========================================

class UserLogin(BaseModel):
    email: str
    password: str

class SuperAdminPartnerCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

class PasswordUpdate(BaseModel):
    new_password: str

class InstitutionStudentCreate(BaseModel):
    name: str
    email: str
    password: str
    institution: str

class SkillAnalysisRequest(BaseModel):
    target_role: str
    student_skills: list

class ChallengeCreate(BaseModel):
    title: str
    organization: str
    description: str
    skills_required: List[str]
    bounty_or_credit: str

class ContributionLog(BaseModel):
    student_email: str
    project_name: str
    task_description: str
    git_commits_count: int
    verified_by_mentor: bool

class OpportunityCreate(BaseModel):
    title: str
    job_type: str    # Maps to the "type" field in React (Internship, etc.)
    location: str
    stipend: str
    skills: str
    description: str
    company_id: int  # We need to know which company posted this!

# ==========================================
# API ENDPOINTS
# ==========================================

# --- AUTHENTICATION ---
@app.post("/api/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {
        "message": "Login successful",
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email,
        "role": db_user.role
    }

# --- SUPER ADMIN ENDPOINTS ---
@app.post("/api/superadmin/partners")
def create_partner_account(partner: SuperAdminPartnerCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.email == partner.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = get_password_hash(partner.password)
    new_partner = UserDB(
        name=partner.name,
        email=partner.email,
        hashed_password=hashed_pw,
        role=partner.role.lower()
    )
    db.add(new_partner)
    db.commit()
    return {"message": f"{partner.role.capitalize()} account created successfully!"}

@app.get("/api/superadmin/partners")
def get_all_partners(db: Session = Depends(get_db)):
    partners = db.query(UserDB).filter(UserDB.role.in_(["institution", "company"])).all()
    return [{"name": p.name, "email": p.email, "role": p.role} for p in partners]

@app.delete("/api/superadmin/partners/{email}")
def delete_partner(email: str, db: Session = Depends(get_db)):
    partner = db.query(UserDB).filter(UserDB.email == email).first()
    if not partner:
        raise HTTPException(status_code=404, detail="Partner not found")
    db.delete(partner)
    db.commit()
    return {"message": "Partner account deleted successfully"}

@app.put("/api/superadmin/partners/{email}/password")
def update_partner_password(email: str, payload: PasswordUpdate, db: Session = Depends(get_db)):
    partner = db.query(UserDB).filter(UserDB.email == email).first()
    if not partner:
        raise HTTPException(status_code=404, detail="Partner not found")
    partner.hashed_password = get_password_hash(payload.new_password)
    db.commit()
    return {"message": "Password updated successfully"}

# --- INSTITUTION ENDPOINTS ---
@app.post("/api/institution/students")
def create_student_for_institution(student: InstitutionStudentCreate, db: Session = Depends(get_db)):
    db_user = db.query(UserDB).filter(UserDB.email == student.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Student email already registered")
    
    hashed_pw = get_password_hash(student.password)
    new_student = UserDB(
        name=student.name,
        email=student.email,
        hashed_password=hashed_pw,
        role="student"
    )
    db.add(new_student)
    db.commit()
    return {"message": f"Student {new_student.name} successfully provisioned!"}

@app.get("/api/institution/students/list")
def get_institution_students(db: Session = Depends(get_db)):
    students = db.query(UserDB).filter(UserDB.role == "student").all()
    activity_statuses = ["Online", "Active 2h ago", "In Interview Session", "Practicing Python", "Viewing Dashboard"]
    
    student_list = []
    for s in students:
        student_list.append({
            "name": s.name,
            "email": s.email,
            "status": random.choice(activity_statuses),
            "progress": random.randint(40, 95)
        })
    return student_list

# --- AI SKILL MAPPING ENDPOINT (GEMINI) ---
@app.post("/api/ai/skill-mapping")
def ai_skill_mapping(payload: SkillAnalysisRequest):
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"""
        Act as an expert AI career and curriculum advisor for a tech placement platform.
        Analyze a student targeting the role of '{payload.target_role}'.
        The student's current verified skills and proficiencies are: {payload.student_skills}.
        
        Provide a JSON response with:
        1. 'readiness_score': an integer percentage (0-100).
        2. 'market_demand': a string like 'Very High' or 'Moderate'.
        3. 'top_missing_skill': a short string identifying the biggest gap.
        4. 'recommendations': a list of 3 specific, actionable learning steps.
        
        Return ONLY valid JSON format without markdown code blocks.
        """
        response = model.generate_content(prompt)
        clean_text = response.text.replace("```json", "").replace("
