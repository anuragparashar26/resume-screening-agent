"""FastAPI backend for Resume Screening Agent."""
from __future__ import annotations

import io
import logging
import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import PyPDF2
import docx

from ai.evaluator import Evaluator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="SkillScreen API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EvaluationResponse(BaseModel):
    evaluation_id: str
    job_title: Optional[str]
    job_description: str
    created_at: str
    results: List[Dict[str, Any]]


@app.get("/")
async def root():
    return {
        "message": "SkillScreen API is running",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


def parse_resume(file_content: bytes, filename: str) -> Dict[str, str]:
    """Parse an uploaded file (PDF or DOCX) and return id/filename/text."""
    text = ""
    
    if filename.lower().endswith(".pdf"):
        try:
            pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
            text = "\n".join(page.extract_text() or "" for page in pdf_reader.pages)
        except Exception as e:
            logger.warning(f"Failed to parse PDF {filename}: {e}")
            text = f"[Could not parse PDF: {e}]"
    
    elif filename.lower().endswith(".docx"):
        try:
            doc = docx.Document(io.BytesIO(file_content))
            text = "\n".join(para.text for para in doc.paragraphs)
        except Exception as e:
            logger.warning(f"Failed to parse DOCX {filename}: {e}")
            text = f"[Could not parse DOCX: {e}]"
    
    else:
        text = f"[Unsupported file format: {filename}]"
    
    return {"id": filename, "filename": filename, "text": text}


@app.post("/api/evaluate", response_model=EvaluationResponse)
async def evaluate_resumes(
    job_description: str = Form(...),
    job_title: Optional[str] = Form(None),
    api_key: str = Form(...),
    resumes: List[UploadFile] = File(...)
):
    """Evaluate resumes against a job description."""
    
    if not job_description or not resumes:
        raise HTTPException(status_code=400, detail="Job description and at least one resume are required")
    
    if not api_key:
        raise HTTPException(status_code=400, detail="Google API key is required")
    
    MAX_FILE_SIZE_MB = 5
    MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
    
    for resume in resumes:
        content = await resume.read()
        if len(content) > MAX_FILE_SIZE_BYTES:
            raise HTTPException(
                status_code=400,
                detail=f"File {resume.filename} exceeds the {MAX_FILE_SIZE_MB}MB limit"
            )
        await resume.seek(0)
    
    parsed_resumes = []
    for resume in resumes:
        content = await resume.read()
        parsed = parse_resume(content, resume.filename)
        parsed_resumes.append(parsed)
        await resume.seek(0)
    
    try:
        evaluator = Evaluator(google_api_key=api_key)
        results = evaluator.evaluate(job_description=job_description, resumes=parsed_resumes)
    except Exception as e:
        logger.exception("Evaluation failed")
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
            raise HTTPException(
                status_code=429,
                detail="API quota exhausted. Please get a new API key or try again later."
            )
        raise HTTPException(status_code=500, detail=f"Evaluation failed: {error_msg}")
    
    eval_id = str(uuid.uuid4())
    
    return EvaluationResponse(
        evaluation_id=eval_id,
        job_title=job_title,
        job_description=job_description,
        created_at=datetime.now().isoformat(),
        results=results
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
