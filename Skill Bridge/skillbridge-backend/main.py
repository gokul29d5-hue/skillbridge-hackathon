import os
import json
import random
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
import google.generativeai as genai
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import make_pipeline

# Import the database and security files
from database import SessionLocal, engine, UserDB, Opportunity, Application
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

# --- GLOBAL ML MODEL ---
skill_model_pipeline = None

def train_ml_model():
    """Trains the scikit-learn model in memory when the server starts."""
    global skill_model_pipeline
    
    synthetic_data = [
        {"target_role": "Frontend Developer", "skills": "React, HTML, CSS, JavaScript, Tailwind", "score": 95},
        {"target_role": "Frontend Developer", "skills": "HTML, CSS, JavaScript", "score": 60},
        {"target_role": "Frontend Developer", "skills": "Python, SQL", "score": 15},
        {"target_role": "Backend Developer", "skills": "Python, FastAPI, PostgreSQL, Docker", "score": 98},
        {"target_role": "Backend Developer", "skills": "Python, SQL", "score": 55},
        {"target_role": "Backend Developer", "skills": "HTML, CSS, React", "score": 10},
        {"target_role": "Data Scientist", "skills": "Python, Pandas, Scikit-Learn, SQL, Math", "score": 92},
        {"target_role": "Data Scientist", "skills": "Python, SQL", "score": 45},
        {"target_role": "Senior Game Developer", "skills": "C++, Unreal Engine, 3D Math, Physics", "score": 90},
        {"target_role": "Senior Game Developer", "skills": "C#, Unity", "score": 50},
    ]
    
    df = pd.DataFrame(synthetic_data)
    df["features"] = df["target_role"] + " " + df["skills"]
    
    skill_model_pipeline = make_pipeline(
        TfidfVectorizer(),
        RandomForestRegressor(n_estimators=100, random_state=42)
    )
    skill_model_pipeline.fit(df["features"], df["score"])
    print("Scikit-learn model trained in-memory successfully!")

# --- STARTUP EVENTS ---
@app.on_event("startup")
def startup_event():
    # 1. Train the ML model
    train_ml_model()
    
    # 2. Setup Super Admin
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
    job_type: str
    location: str
    stipend: str
    skills: str
    description: str
    company_id: int

class ApplicationCreate(BaseModel):
    student_id: int
    opportunity_id: int

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

# --- HYBRID AI SKILL MAPPING ENDPOINT ---
@app.post("/api/ai/skill-mapping")
def ai_skill_mapping(payload: SkillAnalysisRequest):
    try:
        # 1. Scikit-Learn mathematically predicts the readiness score
        student_profile = f"{payload.target_role} {', '.join(payload.student_skills)}"
        predicted_score = int(skill_model_pipeline.predict([student_profile])[0])
        
        # 2. Gemini generates the text recommendations using that score
        model = genai.GenerativeModel('gemini-1.5-flash')
        prompt = f"""
        Act as an expert AI career and curriculum advisor.
        Analyze a student targeting the role of '{payload.target_role}'.
        Their current skills are: {payload.student_skills}.
        Our machine learning algorithm has assigned them a readiness score of {predicted_score}/100.
        
        Provide a JSON response with:
        1. 'readiness_score': {predicted_score} (You MUST use this exact integer).
        2. 'market_demand': a string like 'Very High' or 'Moderate'.
        3. 'top_missing_skill': a short string identifying the biggest gap.
        4. 'recommendations': a list of 3 specific, actionable learning steps.
        
        Return ONLY valid JSON format without markdown code blocks.
        """
        response = model.generate_content(prompt)
        clean_text = response.text.replace("```json", "").replace("```", "").strip()
        result_data = json.loads(clean_text)
        
        # Enforce the scikit-learn score just in case Gemini hallucinates
        result_data["readiness_score"] = predicted_score
        
        return result_data
    except Exception as e:
        return {
            "readiness_score": 50,
            "market_demand": "High",
            "top_missing_skill": "General Technical Proficiency",
            "recommendations": [
                "Review foundational concepts for your target role",
                "Complete a guided project to build a portfolio",
                "Practice algorithmic problem solving"
            ]
        }

# --- COMMUNITY CHALLENGES MARKETPLACE ENDPOINTS ---
GLOBAL_CHALLENGES = [
    {
        "id": 1,
        "title": "Smart Water Management Dashboard",
        "organization": "Local Municipal Corp",
        "description": "Build an IoT-integrated web portal to track water distribution metrics.",
        "skills_required": ["React", "Python", "IoT APIs"],
        "bounty_or_credit": "Verified Industry Project Credit"
    }
]

@app.get("/api/challenges")
def get_challenges():
    return GLOBAL_CHALLENGES

@app.post("/api/challenges")
def post_challenge(challenge: ChallengeCreate):
    new_item = {
        "id": len(GLOBAL_CHALLENGES) + 1,
        "title": challenge.title,
        "organization": challenge.organization,
        "description": challenge.description,
        "skills_required": challenge.skills_required,
        "bounty_or_credit": challenge.bounty_or_credit
    }
    GLOBAL_CHALLENGES.append(new_item)
    return {"message": "Community challenge posted successfully globally!", "challenge": new_item}

# --- INDIVIDUAL CONTRIBUTION LEDGER ENDPOINTS ---
CONTRIBUTIONS_DB = []

@app.post("/api/ledger/contributions")
def log_contribution(log: ContributionLog):
    CONTRIBUTIONS_DB.append(log.dict())
    return {"message": "Contribution successfully recorded to the Individual Ledger!"}

@app.get("/api/ledger/{student_email}")
def get_student_ledger(student_email: str):
    user_logs = [c for c in CONTRIBUTIONS_DB if c["student_email"] == student_email]
    return {"student_email": student_email, "total_verified_contributions": len(user_logs), "logs": user_logs}

# --- RECRUITMENT PIPELINE ENDPOINTS (OPPORTUNITIES) ---
@app.post("/api/opportunities")
def create_opportunity(opp: OpportunityCreate, db: Session = Depends(get_db)):
    company = db.query(UserDB).filter(UserDB.id == opp.company_id, UserDB.role == "company").first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found or invalid role")

    new_opp = Opportunity(
        title=opp.title,
        job_type=opp.job_type,
        location=opp.location,
        stipend=opp.stipend,
        skills=opp.skills,
        description=opp.description,
        company_id=opp.company_id
    )
    
    db.add(new_opp)
    db.commit()
    db.refresh(new_opp)
    
    return {"message": "Opportunity broadcasted successfully!", "opportunity_id": new_opp.id}

@app.get("/api/opportunities")
def get_opportunities(db: Session = Depends(get_db)):
    opportunities = db.query(Opportunity).all()
    
    result = []
    for opp in opportunities:
        company = db.query(UserDB).filter(UserDB.id == opp.company_id).first()
        result.append({
            "id": opp.id,
            "title": opp.title,
            "type": opp.job_type,
            "location": opp.location,
            "stipend": opp.stipend,
            "skills": opp.skills.split(",") if opp.skills else [],
            "description": opp.description,
            "company_name": company.name if company else "Unknown Company",
            "posted_date": opp.created_at.strftime("%b %d, %Y") if opp.created_at else "Just now"
        })
        
    return result

# --- JOB APPLICATIONS ENDPOINT (NEW) ---
@app.post("/api/applications")
def apply_for_opportunity(app_req: ApplicationCreate, db: Session = Depends(get_db)):
    # 1. Verify the student exists
    student = db.query(UserDB).filter(UserDB.id == app_req.student_id, UserDB.role == "student").first()
    if not student:
        raise HTTPException(status_code=404, detail="Student account not found")

    # 2. Verify the opportunity exists
    opportunity = db.query(Opportunity).filter(Opportunity.id == app_req.opportunity_id).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    # 3. Check if the student has already applied
    existing_app = db.query(Application).filter(
        Application.student_id == app_req.student_id,
        Application.opportunity_id == app_req.opportunity_id
    ).first()
    
    if existing_app:
        raise HTTPException(status_code=400, detail="You have already applied for this role.")

    # 4. Save the new application
    new_app = Application(
        student_id=app_req.student_id,
        opportunity_id=app_req.opportunity_id
    )
    db.add(new_app)
    db.commit()
    
    return {"message": "Successfully applied for the opportunity!"}

# ==========================================
# LIVE ANALYTICS DASHBOARD ENDPOINTS
# ==========================================

@app.get("/api/institution")
def get_institution_data(db: Session = Depends(get_db)):
    total_students = db.query(func.count(UserDB.id)).filter(UserDB.role == "student").scalar() or 0
    active_opportunities = db.query(func.count(Opportunity.id)).scalar() or 0
    placed = db.query(func.count(Application.id)).filter(Application.status == "Hired").scalar() or 0
    
    placement_rate = f"{int((placed / total_students) * 100)}%" if total_students > 0 else "0%"

    return {
        "total_students": total_students,
        "active_opportunities": active_opportunities,
        "placed": placed,
        "placement_rate": placement_rate
    }

@app.get("/api/company/{company_id}")
def get_company_data(company_id: int, db: Session = Depends(get_db)):
    active_openings = db.query(func.count(Opportunity.id)).filter(Opportunity.company_id == company_id).scalar() or 0
    
    total_applicants = db.query(func.count(Application.id)).join(Opportunity).filter(Opportunity.company_id == company_id).scalar() or 0
    shortlisted = db.query(func.count(Application.id)).join(Opportunity).filter(Opportunity.company_id == company_id, Application.status == "Shortlisted").scalar() or 0
    interviews_scheduled = db.query(func.count(Application.id)).join(Opportunity).filter(Opportunity.company_id == company_id, Application.status == "Interview").scalar() or 0

    return {
        "active_openings": active_openings,
        "total_applicants": total_applicants,
        "shortlisted": shortlisted,
        "interviews_scheduled": interviews_scheduled
    }

@app.get("/api/student/{student_email}")
def get_student_data(student_email: str, db: Session = Depends(get_db)):
    student = db.query(UserDB).filter(UserDB.email == student_email).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    applications_submitted = db.query(func.count(Application.id)).filter(Application.student_id == student.id).scalar() or 0
    interviews_pending = db.query(func.count(Application.id)).filter(Application.student_id == student.id, Application.status.in_(["Shortlisted", "Interview"])).scalar() or 0

    return {
        "name": student.name,
        "college": "Vel Tech Multi Tech - B.Tech IT",
        "applications_submitted": applications_submitted,
        "interviews_pending": interviews_pending,
        "verified_skills": 3,
        "certifications": 2,
        "projects": 5
    }
