from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

# Import the database and security files we just made
from database import SessionLocal, UserDB, engine
from security import get_password_hash, verify_password

app = FastAPI(title="SkillBridge API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to open a database session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- PYDANTIC SCHEMAS (For checking frontend inputs) ---
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str  # 'student', 'institution', or 'company'

class UserLogin(BaseModel):
    email: str
    password: str

# --- REAL AUTHENTICATION ENDPOINTS ---

@app.post("/api/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # 1. Check if email is already in the database
    db_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # 2. Hash the password securely
    hashed_pw = get_password_hash(user.password)
    
    # 3. Save the new user to the database
    new_user = UserDB(
        name=user.name,
        email=user.email,
        hashed_password=hashed_pw,
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "Account created successfully!", "role": new_user.role}

@app.post("/api/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    # 1. Find the user by email
    db_user = db.query(UserDB).filter(UserDB.email == user.email).first()
    
    # 2. Check if user exists AND password matches the hashed version
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # 3. Success! Return the user's locked role so the frontend knows what to show
    return {
        "message": "Login successful",
        "name": db_user.name,
        "email": db_user.email,
        "role": db_user.role
    }

# --- EXISTING MOCK ENDPOINTS (Kept so your dashboards still load for now) ---

@app.get("/")
def read_root():
    return {"message": "SkillBridge API is LIVE! 🚀"}

@app.get("/api/student")
def get_student_data():
    return {
        "name": "Aarav Sharma",
        "college": "Computer Science Engineering • 3rd Year • XYZ College",
        "verified_skills": 3,
        "certifications": 2,
        "projects": 5,
        "skills": [
            {"name": "Python", "progress": 85, "level": "Advanced"},
            {"name": "Java", "progress": 70, "level": "Intermediate"},
            {"name": "SQL", "progress": 65, "level": "Intermediate"},
            {"name": "Communication", "progress": 90, "level": "Expert"},
            {"name": "Teamwork", "progress": 80, "level": "Advanced"}
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
