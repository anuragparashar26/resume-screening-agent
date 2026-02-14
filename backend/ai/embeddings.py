from __future__ import annotations
import os
from typing import Any, Dict, List, Optional, Sequence
from langchain_google_genai import GoogleGenerativeAIEmbeddings
import numpy as np


GEMINI_EMBED_MODEL = "models/embedding-001"


class GeminiEmbeddingManager:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if not self.api_key:
            raise ValueError("Google API key is not configured. Please provide api_key or set GOOGLE_API_KEY environment variable.")
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model=GEMINI_EMBED_MODEL,
            google_api_key=self.api_key
        )

    def embed_texts(self, texts: Sequence[str], task_type: str = "retrieval_document") -> List[List[float]]:
        vectors = []
        for text in texts:
            try:
                vector = self.embeddings.embed_query(text)
                vectors.append(vector)
            except Exception as e:
                print(f"Warning: Could not embed text. Error: {e}")
                vectors.append([0.0] * 768)
        return vectors

    def embed_query(self, text: str) -> List[float]:
        return self.embed_texts([text], task_type="retrieval_query")[0]

def cosine_similarity(a: Sequence[float], b: Sequence[float]) -> float:
    a_arr = np.array(a, dtype=float)
    b_arr = np.array(b, dtype=float)
    if np.linalg.norm(a_arr) == 0 or np.linalg.norm(b_arr) == 0:
        return 0.0
    return float(np.dot(a_arr, b_arr) / (np.linalg.norm(a_arr) * np.linalg.norm(b_arr)))
