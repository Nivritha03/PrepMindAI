from ..agents.state import AgentState
from langchain_core.messages import SystemMessage
import json

class MockLLM:
    def invoke(self, messages):
        return type('obj', (object,), {'content': '{"roadmap": [{"task": "Review System Design Concepts", "deadline": "2 Days"}]}'})

llm = MockLLM()

def planner_node(state: AgentState):
    """
    Generates a personalized study roadmap based on extracted skills and weaknesses.
    """
    weaknesses = state.get("identified_weaknesses", [])
    skills = state.get("extracted_skills", [])
    
    prompt = f"""
    You are an expert career mentor. Create a personalized learning roadmap.
    
    Candidate Skills: {skills}
    Candidate Weaknesses: {weaknesses}
    
    Respond in JSON format with a single key 'roadmap' containing a list of dictionaries with 'task' and 'deadline' keys.
    """
    
    response = llm.invoke([SystemMessage(content=prompt)])
    
    try:
         parsed = json.loads(response.content)
         return {
             "roadmap": parsed.get("roadmap", []),
             "next_node": "END" # The end of the onboarding workflow
         }
    except Exception:
         return {"roadmap": []}
