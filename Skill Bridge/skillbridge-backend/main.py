from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import random

# Import the database and security files
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

# --- PYDANTIC SCHEMAS ---
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str  # 'institution' or 'company' only now

class UserLogin(BaseModel):
    email: str
    password: str

class InstitutionStudentCreate(BaseModel):
    name: str
    email: str
    password: str
    institution: str

# --- REAL AUTHENTICATION ENDPOINTS ---

@app.post("/api/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    # STRICT BLOCK: Prevent students from self-registering
    if user.role.lower() == 'student':
        raise HTTPException(
            status_code=403, 
            detail="Students cannot self-register. Please contact your institution administrator for credentials."
        )

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
    
    return {
        "message": "Login successful",
        "name": db_user.name,
        "email": db_user.email,
        "role": db_user.role
    }


# --- PHASE 2: INSTITUTION ENDPOINTS ---

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
    db.refresh(new_student)
    
    return {
        "message": f"Student {new_student.name} successfully provisioned!"
    }

@app.get("/api/institution/students/list")
def get_institution_students(db: Session = Depends(get_db)):
    # Fetch all students from the database
    students = db.query(UserDB).filter(UserDB.role == "student").all()
    
    # Attach live mock activity data for the dashboard visual
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


# --- EXISTING MOCK ENDPOINTS ---
@app.get("/")
def read_root():
    return {"message": "SkillBridge API is LIVE! 🚀"}

@app.get("/api/institution")
def get_institution_data():
    return {
        "total_students": 1248,
        "active_opportunities": 38,
        "placed": 184,
        "placement_rate": "84%"
    }

@app.get("/api/student")
def get_student_data():
    return {
        "name": "Test Student",
        "college": "B.Tech IT • Vel Tech Multi Tech Engineering College",
        "verified_skills": 3,
        "certifications": 2,
        "projects": 5,
        "skills": [
            {"name": "Python", "progress": 85, "level": "Advanced"},
            {"name": "React", "progress": 70, "level": "Intermediate"},
            {"name": "SQL", "progress": 65, "level": "Intermediate"}
        ]
    }
