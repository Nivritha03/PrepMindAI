from ..agents.state import AgentState
from langchain_core.messages import SystemMessage, HumanMessage

class MockLLM:
    def invoke(self, messages):
        return type('obj', (object,), {'content': 'Can you explain the difference between a process and a thread?'})

llm = MockLLM()

def interviewer_node(state: AgentState):
    """
    Generates the next interview question based on the history and target skills.
    """
    interview_type = state.get("interview_type", "TECHNICAL")
    skills = state.get("extracted_skills", [])
    messages = state.get("messages", [])
    
    prompt = f"""
    You are a strict but fair AI interviewer conducting a {interview_type} interview.
    The candidate has expertise in {skills}.
    Ask the candidate ONE relevant interview question. Do not provide the answer.
    """
    
    # We pass the conversation history to the LLM
    response = llm.invoke([SystemMessage(content=prompt)] + messages)
    
    return {
        "current_question": response.content,
        "next_node": "wait_for_user_answer" 
        # In a real async flow, the graph waits here.
    }
