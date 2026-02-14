from __future__ import annotations
import logging
from typing import Any, Dict, List
from langchain_google_genai import ChatGoogleGenerativeAI
from .embeddings import GeminiEmbeddingManager, cosine_similarity
from .prompts import EVALUATION_PROMPT, evaluation_parser

logger = logging.getLogger(__name__)

class Evaluator:
    def __init__(self, google_api_key: str):
        if not google_api_key:
            raise ValueError("Google API key is required")
        self.embed_manager = GeminiEmbeddingManager(api_key=google_api_key)
        self.model = "gemini-2.5-flash"
        self.llm = ChatGoogleGenerativeAI(
            model=self.model,
            google_api_key=google_api_key,
            temperature=0.3,
            convert_system_message_to_human=True
        )
        self.chain = EVALUATION_PROMPT | self.llm | evaluation_parser

    def _call_llm(self, job_description: str, resume_text: str, similarity: float) -> Dict[str, Any]:
        try:
            result = self.chain.invoke({
                "job_description": job_description,
                "resume_text": resume_text,
                "similarity": similarity,
                "format_instructions": evaluation_parser.get_format_instructions()
            })
            return result
        except Exception as e:
            logger.exception("LLM call failed")
            error_msg = str(e)
            if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
                return {
                    "score": 0,
                    "summary": f"API quota exhausted for model '{self.model}'. Please get a new API key from https://aistudio.google.com/app/apikey or try a different model.",
                    "matching_skills": [],
                    "missing_skills": []
                }
            return {
                "score": 0,
                "summary": f"(LLM failed: {error_msg[:150]})",
                "matching_skills": [],
                "missing_skills": []
            }

    def evaluate(self, job_description: str, resumes: List[Dict[str, str]]) -> List[Dict[str, Any]]:
        jd_embedding = self.embed_manager.embed_query(job_description)
        results: List[Dict[str, Any]] = []
        for r in resumes:
            rid = r.get("id")
            text = r.get("text", "")
            filename = r.get("filename")
            resume_embedding = self.embed_manager.embed_texts([text])[0]
            similarity = cosine_similarity(jd_embedding, resume_embedding)
            llm_result = self._call_llm(job_description, text, similarity)
            result = {
                "candidate_name": filename,
                "score": llm_result.get("score", 0) * 0.6 + similarity * 100 * 0.4,
                "summary": llm_result.get("summary", ""),
                "matching_skills": llm_result.get("matching_skills", []),
                "missing_skills": llm_result.get("missing_skills", []),
                "similarity": similarity,
                "llm_score": llm_result.get("score", 0)
            }
            results.append(result)
        return results
