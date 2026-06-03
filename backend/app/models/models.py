from datetime import datetime
from enum import Enum
from typing import Optional

from beanie import Document, PydanticObjectId
from pydantic import Field

class InterviewType(str, Enum):
    TECHNICAL = "TECHNICAL"
    HR = "HR"
    BEHAVIORAL = "BEHAVIORAL"

class User(Document):
    name: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    password: str
    target_company: Optional[str] = None
    target_role: Optional[str] = None
    experience_level: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"

class Interview(Document):
    user_id: PydanticObjectId = Field(index=True)
    interview_type: InterviewType
    score: Optional[int] = None
    feedback: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "interviews"

class Skill(Document):
    user_id: PydanticObjectId = Field(index=True)
    skill_name: str = Field(index=True)
    strength_level: int

    class Settings:
        name = "skills"

class Roadmap(Document):
    user_id: PydanticObjectId = Field(index=True)
    task: str
    status: str
    deadline: Optional[datetime] = None

    class Settings:
        name = "roadmaps"
