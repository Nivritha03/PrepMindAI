import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import (
    init_beanie,
)

from ..models.models import User, Interview, Skill, Roadmap

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "prepmind_db")

async def init_db():
    client = AsyncIOMotorClient(DATABASE_URL)
    await init_beanie(
        database=client[DATABASE_NAME], 
        document_models=[
            User, 
            Interview, 
            Skill, 
            Roadmap
        ]
    )
