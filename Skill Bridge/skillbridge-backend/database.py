import os
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

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

# Create tables in PostgreSQL automatically on startup
Base.metadata.create_all(bind=engine)
