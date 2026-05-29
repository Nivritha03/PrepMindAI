from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func
import enum
from ..db.database import Base

class InterviewType(str, enum.Enum):
    TECHNICAL = "TECHNICAL"
    HR = "HR"
    BEHAVIORAL = "BEHAVIORAL"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)  # Hashed password
    target_company = Column(String, nullable=True)
    target_role = Column(String, nullable=True)
    experience_level = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    interview_type = Column(Enum(InterviewType))
    score = Column(Integer, nullable=True)
    feedback = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    skill_name = Column(String, index=True)
    strength_level = Column(Integer)  # e.g. 1 to 5

class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    task = Column(String)
    status = Column(String)  # e.g., PENDING, IN_PROGRESS, COMPLETED
    deadline = Column(DateTime(timezone=True), nullable=True)
