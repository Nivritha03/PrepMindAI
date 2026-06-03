import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from contextlib import asynccontextmanager

from .api.routes import router as api_router
from .api.auth import router as auth_router
from .db.database import init_db

logger = logging.getLogger("prepmind")

# Background job function
def check_reminders_and_notify():
    # Example autonomous task logic
    # Here you would query the DB for tasks with status PENDING and deadlines < 24 hrs
    logger.info("Autonomous Agent: Scanning MongoDB ROADMAPS for upcoming deadlines...")
    # send_email(...)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup MongoDB connection
    await init_db()
    logger.info("MongoDB initialized with Beanie.")
    
    # Startup APScheduler
    scheduler = BackgroundScheduler()
    # Runs the check every 60 seconds for demonstration (normally set to hours/days)
    scheduler.add_job(check_reminders_and_notify, 'interval', seconds=60)
    scheduler.start()
    logger.info("Scheduler started successfully for background reminders.")
    yield
    # Shutdown
    scheduler.shutdown()
    logger.info("Scheduler shutdown.")

app = FastAPI(
    title="PrepMind AI API",
    description="Backend API with Autonomous Memory & Scheduling",
    version="2.0.0",
    lifespan=lifespan
)

# CORS configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
app.include_router(auth_router, prefix="/api/auth")

@app.get("/")
async def root():
    return {"message": "Welcome to PrepMind AI Backend"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
