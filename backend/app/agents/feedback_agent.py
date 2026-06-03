from ..agents.state import AgentState
from langchain_core.messages import SystemMessage
import json

class MockResponse:
    def __init__(self, content: str):
        self.content = content

class MockLLM:
    def invoke(self, messages) -> MockResponse:
        return MockResponse(content='{"feedback": "Good understanding, but missed mentioning memory isolation.", "score": 7}')

llm = MockLLM()

def feedback_node(state: AgentState):
    """
    Evaluates the user's answer to the current question and updates their score.
    """
    question = state.get("current_question", "")
    answer = state.get("user_answer", "")
    
    prompt = f"""
    Evaluate the candidate's answer to the following question.
    
    Question: {question}
    Answer: {answer}
    
    Provide constructive feedback and a score from 1 to 10.
    Respond strictly in JSON with keys 'feedback' (string) and 'score' (int).
    """
    
    response = llm.invoke([SystemMessage(content=prompt)])
    
    try:
         parsed = json.loads(response.content)
         return {
             "feedback": parsed.get("feedback", "No feedback provided."),
             "overall_score": parsed.get("score", 0),
             "messages": [SystemMessage(content=parsed.get("feedback", ""))],
             "next_node": "interviewer" # Loop back or end based on limits
         }
    except Exception:
         return {"feedback": "Error evaluating answer."}
