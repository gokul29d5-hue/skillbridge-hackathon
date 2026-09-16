import os
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# Get DATABASE_URL from environment (Render PostgreSQL), fallback to local SQLite for testing
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./skillbridge.db")

# Fix for Render/Heroku URLs where SQLAlchemy expects 'postgresql://' instead of 'postgres://'
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Configure engine safely for both PostgreSQL and SQLite
engine_args = {}
if "sqlite" in SQLALCHEMY_DATABASE_URL:
    engine_args["connect_args"] = {"check_same_thread": False}

engine = create_engine(SQLALCHEMY_DATABASE_URL, **engine_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String) # 'student', 'institution', or 'company'
    name = Column(String)

    # Relationships pointing to the new tables
    opportunities = relationship("Opportunity", back_populates="company")
    applications = relationship("Application", back_populates="student")


class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(Integer, primary_key=True, index=True)
    # Link this job to the company that posted it
    company_id = Column(Integer, ForeignKey("users.id")) 
    
    title = Column(String, index=True)
    job_type = Column(String)
    location = Column(String)
    stipend = Column(String)
    skills = Column(String)
    description = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    company = relationship("UserDB", back_populates="opportunities")
    applications = relationship("Application", back_populates="opportunity", cascade="all, delete-orphan")


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    opportunity_id = Column(Integer, ForeignKey("opportunities.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    
    status = Column(String, default="Pending")
    applied_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    opportunity = relationship("Opportunity", back_populates="applications")
    student = relationship("UserDB", back_populates="applications")


# Create tables in PostgreSQL automatically on startup
Base.metadata.create_all(bind=engine)
