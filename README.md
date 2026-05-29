<div align="center">
  <h1>🧠 PrepMind AI</h1>
  <p><b>Autonomous AI-Powered Interview Preparation Platform</b></p>
  <p>Analyze resumes · Generate roadmaps · Conduct mock interviews · Track your progress</p>
  <br/>
</div>

---

## 📌 Overview

PrepMind AI is a full-stack, multi-agent platform that acts as your personal AI placement mentor. It understands your background, identifies gaps, creates a personalized study plan, and puts you through realistic mock interview sessions — all powered by an intelligent agent pipeline built with LangGraph.

Unlike a simple chatbot, PrepMind uses a network of specialized AI agents that each have a distinct role: one analyzes your resume, another plans your learning path, another conducts the interview, and another scores your answers, creating a coherent, end-to-end preparation experience.

---

## ✨ Features

### 1. 📄 Resume Analyzer
Upload your resume as a PDF. The Resume Agent reads and extracts:
- Your technical skills (languages, frameworks, tools)
- Gaps and weak areas based on your role target
- Recommendations for how to strengthen your profile

This analysis is stored in memory and used to personalize every other part of the platform.

### 2. 🗺️ Personalized Learning Roadmap
Based on the resume analysis, the Planner Agent generates a step-by-step, prioritized roadmap covering:
- **Data Structures & Algorithms** — with focus areas per your weak points
- **System Design** — from basic concepts to large-scale architecture
- **Behavioral / HR preparation** — STAR method, communication patterns
- **Deadlines & scheduling** — each milestone gets a suggested completion date

The roadmap is visual and interactive in the UI, with live progress tracking.

### 3. 🎤 Mock Interview Agent
The Interviewer Agent conducts realistic, dynamic interviews. It:
- Adapts question difficulty to your experience level
- Covers **Technical**, **Behavioral**, and **HR** interview formats
- Maintains conversation context across multiple questions in a session
- Moves to the next question only after the Feedback Agent evaluates your answer

You can respond by typing or using the **Voice AI** push-to-talk button (Web Speech API integration ready).

### 4. 💻 Coding Challenge Generator
The Coding Agent generates algorithm and data structure problems:
- Targeted specifically at your identified weak areas
- Adjusts difficulty based on your past performance score
- Generates clean problem statements with input/output examples

### 5. 📊 Feedback & Scoring Agent
After every answer in the mock interview, the Feedback Agent:
- Scores your response on a scale of **1–10**
- Identifies what was strong and what was missing
- Provides a concise, constructive critique  
- Logs the score to your dashboard metrics

### 6. 📈 Progress Dashboard
A central hub showing your full preparation journey:
- Average score across all interviews
- Number of sessions completed
- Current weak points being targeted
- Recent interview session history with per-session feedback

### 7. 🔗 GitHub Profile Analyzer
Connect your GitHub username and the platform will:
- Scan your public repositories for languages and tech stacks used
- Identify your most active open-source projects
- Generate a developer profile summary to strengthen your technical credibility in interviews

### 8. ⏰ Autonomous Reminder System
A background scheduler (powered by APScheduler) runs alongside the server and:
- Monitors your roadmap deadlines automatically
- Sends reminder notifications when study targets are approaching
- Operates completely independently without any manual trigger

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| **Backend** | FastAPI, Python 3.11, Uvicorn |
| **AI Agents** | LangGraph, LangChain, Google Gemini / OpenAI |
| **Vector Memory** | ChromaDB (semantic search & long-term context) |
| **Relational DB** | PostgreSQL (via SQLAlchemy ORM) |
| **Background Jobs** | APScheduler |
| **Containerization** | Docker, Docker Compose |

---

## 📐 Architecture

PrepMind uses a **LangGraph state machine** to orchestrate agents in sequence and in loops. Each agent reads from and writes to a shared `AgentState` object, enabling long-term memory and contextual conversations.

```
User → React Frontend
         ↓ (REST API)
      FastAPI Backend
         ↓
   LangGraph Orchestrator
    ├── Resume Agent       → Extracts skills & weaknesses
    ├── Planner Agent      → Builds personalized roadmap
    ├── Interviewer Agent  → Generates interview questions
    ├── Coding Agent       → Creates coding challenges
    └── Feedback Agent     → Scores & critiques answers
         ↓              ↓
     PostgreSQL       ChromaDB
    (User data)    (Vector memory)
```

---

## 📂 Project Structure

```
PrepMindAI/
├── frontend/                   # React SPA
│   └── src/
│       ├── pages/
│       │   ├── Dashboard.tsx   # Metrics & progress overview
│       │   ├── ResumeUpload.tsx# PDF upload & analysis trigger
│       │   ├── Roadmap.tsx     # Personalized learning timeline
│       │   └── InterviewRoom.tsx # Live AI interview chat
│       └── components/
│           └── Layout.tsx      # Sidebar navigation shell
│
├── backend/
│   └── app/
│       ├── agents/
│       │   ├── state.py        # Shared LangGraph AgentState
│       │   ├── graph.py        # Onboarding & Interview workflows
│       │   └── *.py            # Individual agent implementations
│       ├── api/
│       │   └── routes.py       # FastAPI route handlers
│       ├── db/
│       │   └── database.py     # SQLAlchemy engine & session
│       ├── models/
│       │   └── models.py       # User, Interview, Roadmap models
│       ├── memory/
│       │   └── vector_store.py # ChromaDB vector store utilities
│       ├── services/
│       │   ├── pdf_parser.py   # Resume PDF text extractor
│       │   ├── github_analyzer.py # GitHub API profile scanner
│       │   └── linkedin_analyzer.py # LinkedIn ATS hint parser
│       └── main.py             # FastAPI app + APScheduler startup
│
├── docker-compose.yml          # PostgreSQL database container
├── backend/Dockerfile          # Backend container definition
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- Docker Desktop (for the database)
- An API key from [Google AI Studio](https://aistudio.google.com) (Gemini) or OpenAI

---

### Step 1 — Start the Database
```bash
docker-compose up -d
```
This starts a PostgreSQL 15 container on port `5432`.

---

### Step 2 — Start the Backend
```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# Activate it (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```
API is now live at: `http://localhost:8000`  
OpenAPI docs available at: `http://localhost:8000/docs`

---

### Step 3 — Connect Your LLM Key
Open `backend/app/agents/` and replace the `MockLLM` placeholder in any agent file with your real provider:

```python
# Before (mock)
llm = MockLLM()

# After (Gemini)
from langchain_google_genai import ChatGoogleGenerativeAI
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key="YOUR_KEY")
```

---

### Step 4 — Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
App is live at: `http://localhost:5173`

---

## 📖 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check ping |
| `GET` | `/api/dashboard` | Fetch user metrics & recent sessions |
| `POST` | `/api/upload-resume` | Upload PDF → triggers Resume + Planner agents |
| `POST` | `/api/interview/start` | Initialize a new interview session |
| `POST` | `/api/interview/answer` | Submit an answer → triggers Feedback agent |

---

## 🌟 Planned Enhancements
- [ ] Live voice interview via DeepGram WebSocket (speech-to-text)
- [ ] Webcam-based confidence & eye contact tracking (OpenCV)
- [ ] In-browser code editor for coding challenges (Monaco Editor)
- [ ] Company-specific interview mode (FAANG, startups, etc.)
- [ ] Email / SMS reminders via Twilio or SendGrid
