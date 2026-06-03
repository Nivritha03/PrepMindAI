from typing import Dict, Any
from fastapi import APIRouter, UploadFile, File, HTTPException

from ..services.pdf_parser import extract_text_from_pdf
from ..agents.graph import onboarding_graph, interview_graph

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard():
    """
    Returns analytics and metrics for the user dashboard.
    """
    # Mock return for project setup
    return {
        "average_score": 8.2,
        "interviews_given": 14,
        "weakness_solved": "System Design",
        "recent_activities": [
            {"title": "Technical Interview - React.js", "score": 9}
        ]
    }

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """
    Parses a PDF resume and runs the onboarding LangGraph workflow.
    """
    if not file.filename or not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    pdf_bytes = await file.read()
    extracted_text = extract_text_from_pdf(pdf_bytes)
    
    # Initialize the LangGraph agent state for the pipeline
    initial_state = {
        "resume_text": extracted_text,
        "messages": [],
        "user_id": 1, # Placeholder auth user
    }
    
    # Run the onboarding Master agent graph
    result = onboarding_graph.invoke(initial_state) # type: ignore
    
    return {
        "status": "success",
        "extracted_skills": result.get("extracted_skills", []),
        "identified_weaknesses": result.get("identified_weaknesses", []),
        "generated_roadmap": result.get("roadmap", [])
    }

@router.post("/interview/start")
async def start_interview(payload: Dict[str, Any]):
    """
    Initializes a new interview session.
    """
    interview_type = payload.get("type", "TECHNICAL")
    
    initial_state = {
        "interview_type": interview_type,
        "extracted_skills": ["Python", "System Design"], # Expected from DB
        "messages": [],
    }
    
    # Trigger graph up to the interviewer node
    result = interview_graph.invoke(initial_state) # type: ignore
    
    return {
        "question": result.get("current_question", "Give me an overview of your experience.")
    }

@router.post("/interview/answer")
async def submit_answer(payload: Dict[str, Any]):
    """
    Receives candidate answer and cycles through Feedback -> Interviewer graph nodes.
    """
    answer = payload.get("answer", "")
    question = payload.get("question", "")
    
    current_state = {
        "current_question": question,
        "user_answer": answer,
        "messages": []
    }
    
    # Run the feedback eval graph
    result = interview_graph.invoke(current_state) # type: ignore
    
    return {
        "feedback": result.get("feedback", ""),
        "score": result.get("overall_score", 0),
        "next_question": result.get("current_question", "No more questions.")
    }
