import json
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from groq import Groq
from pydantic import BaseModel
from pypdf import PdfReader

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

model = "openai/gpt-oss-120b"
app=FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
#parse resume
class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = []

class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = []
    experiences: list[Experience] = []
    education: list[str] = []
    projects: list[str] = []
    certifications: list[str] = []
resume_schema = Resume.model_json_schema()

class ChatRequest(BaseModel):
    question: str

def ask_candidate(question: str, resume: Resume):

    system_prompt = f"""
You are a smart, friendly, and concise AI assistant representing Siddhant Mahapatra on his personal portfolio website.

Candidate profile data:
{resume.model_dump_json(indent=2)}

Core Guidelines:
1. Always be concise, punchy, and professional. Never produce long walls of text or dump the entire resume.
2. For introductory questions like "Tell me about Siddhant" or "Who is Siddhant":
   - Start with a warm 1-2 sentence intro stating who he is and his focus (Software Developer specializing in Backend Engineering, AI/LLM integration, and Test Automation).
   - Follow with 3-4 bullet points highlighting his core highlights:
     * **Open Source**: 7+ merged PRs in production repositories including JupyterLab & OpenSRE.
     * **Key Projects**: Built full-stack and AI apps like INE Price Tracker, RazorSave, and computer vision systems.
     * **Technical Strengths**: Python (FastAPI, Django), TypeScript/React, PostgreSQL, and AI/ML workflows.
   - Keep the entire answer under 120 words.
3. For specific questions (e.g. "What projects has he done?", "Tell me about his skills"):
   - Answer directly using concise bullet points with brief 1-line explanations.
4. Formatting rules:
   - Use clean Markdown with bold keywords for readability.
   - Use standard bullet points (- or *).
   - Do NOT use markdown tables or H1/H2 headings.
5. If information is not in the candidate data, politely reply: "I don't have that specific detail in Siddhant's resume, but feel free to reach out to him directly!"
"""

    response = client.chat.completions.create(

        model=model,

        messages=[

            {
                "role":"system",
                "content":system_prompt
            },

            {
                "role":"user",
                "content":question
            }

        ]

    )

    return response.choices[0].message.content
def parse_resume(resume_text):
    system_prompt = f"""
    You are an expert resume parser.

    Extract information from the resume based on its meaning,
    not only based on exact section headings.

    Different resumes may use different headings.

    For example:
    - Experience
    - Professional Experience
    - Work History
    - Employment
    - Internships

    These may all contain relevant experience.

    Skills may also appear in the skills section, work experience,
    internships or projects.

    Return ONLY valid JSON matching this schema:

    {resume_schema}

    Important rules:

    1. Do not invent information.
    2. If a value is not available, return null.
    3. If a list has no information, return an empty list.
    4. Include internships inside experiences.
    5. Extract skills mentioned across the entire resume.
    """
    user_prompt = f"""
    Parse the following resume:

    {resume_text}
    """
    message_system={
        "role" : "system",
        "content" : system_prompt
    }
    message_user={
        "role" : "user",
        "content" : user_prompt
    }
    messages=[message_system, message_user]
    response_format={
        "type": "json_object"
    }
    response=client.chat.completions.create(model=model, messages=messages, response_format=response_format)
    raw_output = response.choices[0].message.content
    data = json.loads(raw_output)
    resume = Resume(**data)
    return resume

#pdf extraction
def read_pdf(file_path: Path):

    reader = PdfReader(file_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text

@app.get("/")
def home():
    # resume_text=read_pdf(Path("my_resume.pdf"))
    # resume=parse_resume(resume_text)
    return {
        "message" : "Its the home page"
    }



_cached_resume: Resume | None = None

def get_parsed_resume() -> Resume:
    global _cached_resume
    if _cached_resume is None:
        pdf_path = Path(__file__).parent / "siddhant_mahapatra_dev.pdf"
        if not pdf_path.exists():
            pdf_path = Path("siddhant_mahapatra_dev.pdf")
        resume_text = read_pdf(pdf_path)
        _cached_resume = parse_resume(resume_text)
    return _cached_resume

def ask_candidate_stream(question: str, resume: Resume):
    system_prompt = f"""
You are a smart, friendly, and concise AI assistant representing Siddhant Mahapatra on his personal portfolio website.

Candidate profile data:
{resume.model_dump_json(indent=2)}

Core Guidelines:
1. Always be concise, punchy, and professional. Never produce long walls of text or dump the entire resume.
2. For introductory questions like "Tell me about Siddhant" or "Who is Siddhant":
   - Start with a warm 1-2 sentence intro stating who he is and his focus (Software Developer specializing in Backend Engineering, AI/LLM integration, and Test Automation).
   - Follow with 3-4 bullet points highlighting his core highlights:
     * **Open Source**: 7+ merged PRs in production repositories including JupyterLab & OpenSRE.
     * **Key Projects**: Built full-stack and AI apps like INE Price Tracker, RazorSave, and computer vision systems.
     * **Technical Strengths**: Python (FastAPI, Django), TypeScript/React, PostgreSQL, and AI/ML workflows.
   - Keep the entire answer under 120 words.
3. For specific questions (e.g. "What projects has he done?", "Tell me about his skills"):
   - Answer directly using concise bullet points with brief 1-line explanations.
4. Formatting rules:
   - Use clean Markdown with bold keywords for readability.
   - Use standard bullet points (- or *).
   - Do NOT use markdown tables or H1/H2 headings.
5. If information is not in the candidate data, politely reply: "I don't have that specific detail in Siddhant's resume, but feel free to reach out to him directly!"
"""

    stream = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ],
        stream=True
    )

    for chunk in stream:
        delta = chunk.choices[0].delta.content or ""
        if delta:
            yield delta

@app.post("/chat")
def chat(request: ChatRequest):
    resume = get_parsed_resume()
    return StreamingResponse(
        ask_candidate_stream(request.question, resume),
        media_type="text/plain; charset=utf-8"
    )
