from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import bcrypt
from jose import jwt
from datetime import datetime, timedelta
import os

from ..models.models import User

router = APIRouter()



# JWT config
SECRET_KEY = os.getenv("SECRET_KEY", "prepmind-super-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


# --- Request / Response Schemas ---

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    target_role: str
    experience_level: str


class LoginRequest(BaseModel):
    email: str
    password: str


class AuthResponse(BaseModel):
    token: str
    user: dict


# --- Helpers ---

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))


def create_token(user_id: str) -> str:
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode({"sub": user_id, "exp": expire}, SECRET_KEY, algorithm=ALGORITHM)


def user_to_dict(user: User) -> dict:
    return {
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
        "target_role": user.target_role,
        "experience_level": user.experience_level,
        "avatarInitials": "".join([n[0] for n in user.name.split() if n])[:2].upper(),
        "resumeUploaded": False,
    }


# --- Routes ---

@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def register(body: RegisterRequest):
    # Check if email already exists
    existing = await User.find_one(User.email == body.email)
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")

    # Create and save user
    new_user = User(
        name=body.name,
        email=body.email,
        password=hash_password(body.password),
        target_role=body.target_role,
        experience_level=body.experience_level,
    )
    await new_user.insert()

    token = create_token(str(new_user.id))
    return AuthResponse(token=token, user=user_to_dict(new_user))


@router.post("/login", response_model=AuthResponse)
async def login(body: LoginRequest):
    user = await User.find_one(User.email == body.email)
    if not user or not verify_password(body.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = create_token(str(user.id))
    return AuthResponse(token=token, user=user_to_dict(user))
