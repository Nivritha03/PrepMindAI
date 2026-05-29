from typing import TypedDict, Annotated, List, Dict
from langgraph.graph.message import add_messages
from langchain_core.messages import BaseMessage


class AgentState(TypedDict):
    """
    State object for the Multi-Agent Interview Prep Workflow.
    """
    messages: Annotated[list[BaseMessage], add_messages]
    
    # User Context
    user_id: int
    session_id: str
    
    # Extracted Data
    resume_text: str
    extracted_skills: List[str]
    identified_weaknesses: List[str]
    
    # Planner & Roadmap
    roadmap: List[Dict[str, str]]
    
    # Interview Context
    interview_type: str  # e.g., "TECHNICAL", "HR", "BEHAVIORAL"
    current_question: str
    user_answer: str
    feedback: str
    overall_score: int
    
    # Orchestration Logic
    next_node: str
