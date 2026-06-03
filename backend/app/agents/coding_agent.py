from ..agents.state import AgentState
from langchain_core.messages import SystemMessage
import json

class MockResponse:
    def __init__(self, content: str):
        self.content = content

class MockLLM:
    def invoke(self, messages) -> MockResponse:
        return MockResponse(content='{"question": "Write a function to reverse a linked list.", "difficulty": "Medium"}')

llm = MockLLM()

def coding_node(state: AgentState):
    """
    Generates algorithmic coding challenges for technical interviews.
    """
    skills = state.get("extracted_skills", [])
    weaknesses = state.get("identified_weaknesses", [])
    
    prompt = f"""
    You are an expert technical interviewer focusing on DSA and System Design.
    The candidate has skills: {skills}
    The candidate needs improvement in: {weaknesses}
    
    Generate a relevant coding question to test them.
    Respond in JSON format with keys 'question' (string) and 'difficulty' (string).
    """
    
    response = llm.invoke([SystemMessage(content=prompt)])
    
    try:
        parsed = json.loads(response.content)
        return {
            "current_question": parsed.get("question", "Write a simple program."),
            "next_node": "feedback"
        }
    except Exception:
        return {"current_question": "Error generating question."}
