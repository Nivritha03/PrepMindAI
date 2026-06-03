from ..agents.state import AgentState
from langchain_core.messages import SystemMessage, HumanMessage
import json

# In a real setup, instantiate this from your chosen LLM provider (e.g. ChatOpenAI or ChatGoogleGenerativeAI)
# from langchain_google_genai import ChatGoogleGenerativeAI
# llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")

class MockResponse:
    def __init__(self, content: str):
        self.content = content

class MockLLM:
    """Mock LLM to represent output until API keys are configured."""
    def invoke(self, messages) -> MockResponse:
        # Extremely basic mock for parsing
        return MockResponse(content='{"skills": ["Python", "React", "FastAPI"], "weaknesses": ["System Design"]}')

llm = MockLLM()

def resume_analysis_node(state: AgentState):
    """
    Analyzes the raw resume text and extracts skills and weaknesses.
    """
    resume_text = state.get("resume_text", "")
    
    prompt = f"""
    You are an expert technical recruiter and resume analyzer.
    Extract the core technical and soft skills from the following resume text.
    Also, identify any clear weaknesses or missing relevant skills for a Software Engineer role.
    
    Respond STRICTLY in JSON format with keys "skills" (list) and "weaknesses" (list).
    
    Resume:
    {resume_text}
    """
    
    response = llm.invoke([SystemMessage(content=prompt)])
    
    try:
        parsed_data = json.loads(response.content)
        return {
            "extracted_skills": parsed_data.get("skills", []),
            "identified_weaknesses": parsed_data.get("weaknesses", []),
            "next_node": "planner"
        }
    except Exception as e:
        return {
            "extracted_skills": [],
            "identified_weaknesses": [],
            "next_node": "planner" # Graceful degradation
        }
