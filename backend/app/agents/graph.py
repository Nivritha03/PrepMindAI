from langgraph.graph import StateGraph, END
from .state import AgentState
from .resume_agent import resume_analysis_node
from .planner_agent import planner_node
from .interviewer_agent import interviewer_node
from .feedback_agent import feedback_node
from .coding_agent import coding_node

def build_onboarding_graph():
    """
    Builds the workflow graph for new users when they upload a resume.
    Pipeline: Resume Analysis -> Roadmap Planning
    """
    builder = StateGraph(AgentState)
    
    builder.add_node("resume_analyzer", resume_analysis_node)
    builder.add_node("planner", planner_node)
    
    builder.add_edge("resume_analyzer", "planner")
    builder.add_edge("planner", END)
    
    builder.set_entry_point("resume_analyzer")
    return builder.compile()

def build_interview_graph():
    """
    Builds the workflow graph for conducting a mock interview.
    Pipeline: Interviewer asks -> User answers (external) -> Feedback evaluates -> Loop
    """
    builder = StateGraph(AgentState)
    
    builder.add_node("interviewer", interviewer_node)
    builder.add_node("coding", coding_node)
    builder.add_node("feedback", feedback_node)
    
    # Note: User interaction represents an interruption/break in the graph in production,
    # usually handled by a human-in-the-loop checkpoint or an external API gateway.
    # For this simplified graph, we assume the inputs come in via state updates.
    
    builder.add_edge("interviewer", "feedback") # in reality, wait for user answer
    builder.add_edge("feedback", END) 
    
    builder.set_entry_point("interviewer")
    return builder.compile()

# Instantiate compiled graphs
onboarding_graph = build_onboarding_graph()
interview_graph = build_interview_graph()
