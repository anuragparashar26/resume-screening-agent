"""Configuration and environment helpers."""
from __future__ import annotations

import os
from dataclasses import dataclass
from typing import Optional

from dotenv import load_dotenv


load_dotenv()


@dataclass
class Settings:
    """Application settings loaded from environment."""
    google_api_key: str


def get_settings() -> Settings:
    """Load settings from environment and return a Settings object.

    Values can be provided via a `.env` file or environment variables.
    """
    google_api_key = os.getenv("GOOGLE_API_KEY")
    if not google_api_key:
        raise ValueError(
            "GOOGLE_API_KEY environment variable is required. "
            "Get your API key from https://aistudio.google.com/app/apikey"
        )
    
    return Settings(google_api_key=google_api_key)