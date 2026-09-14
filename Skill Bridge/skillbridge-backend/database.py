from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

# Create a SQLite database file named 'skillbridge.db'
SQLALCHEMY_DATABASE_URL = "sqlite:///./skillbridge.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# This is your real Database Table for Users
class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String) # 'student', 'institution', or 'company'
    name = Column(String)

# Create the tables in the database
Base.metadata.create_all(bind=engine)
