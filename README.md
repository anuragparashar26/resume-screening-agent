# SkillScreen - Resume Screening Agent

A modern web application that helps recruiters evaluate and rank resumes against a Job Description (JD) using Google Gemini AI with a React frontend and FastAPI backend.


## Features

- **Upload Job Descriptions** - Paste or type the JD for the position
- **Upload Multiple Resumes** - Support for PDF and DOCX formats (max 5MB each)
- **AI-Powered Evaluation** - Uses Google Gemini 2.0 Flash Exp for intelligent scoring
- **Hybrid Scoring System** - Combines LLM analysis (60%) with embedding similarity (40%)
- **Skills Analysis** - Identifies matching and missing skills for each candidate
- **Match Score & Summary** - 0-100 score with detailed fit summary
- **Export to CSV** - Download evaluation results for further analysis
- **Browser Storage History** - All evaluations stored in browser localStorage
- **View & Delete Past Evaluations** - Manage your evaluation history locally
- **Mobile Responsive** - Works on desktop and mobile devices
- **Modern UI** - Material-UI based React interface

## Tech Stack

| Component            | Technology                      | Purpose                               |
| -------------------- | ------------------------------- | ------------------------------------- |
| **Frontend**         | React + Material-UI             | Modern web UI                         |
| **Backend**          | FastAPI                         | REST API server                       |
| **LLM**              | Google Gemini                   | Resume evaluation & scoring           |
| **LLM Framework**    | LangChain                       | Prompt orchestration & output parsing |
| **Embeddings**       | Google Gemini Embeddings        | Text vectorization                    |
| **Document Parsing** | PyPDF2, python-docx             | Resume text extraction                |

## Project Structure

```
skillscreen/
├── backend/
│   ├── main.py                # FastAPI backend server
│   ├── config.py              # Environment loader & settings
│   ├── ai/
│   │   ├── __init__.py
│   │   ├── prompts.py         # LangChain prompt templates
│   │   ├── evaluator.py       # Core evaluation logic
│   │   └── embeddings.py      # Gemini embeddings manager
│   ├── requirements.txt       # Python dependencies
│   └── __init__.py            # Backend package marker
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── EvaluationForm.js
│   │   │   ├── ResultsDisplay.js
│   │   │   └── HistorySidebar.js
│   │   ├── App.js             # Main React component
│   │   ├── App.css
│   │   ├── index.js           # React entry point
│   │   └── index.css
│   ├── package.json           # Frontend dependencies
│   └── .env.example           # Environment variables template
├── requirements.txt           # Python dependencies (root, optional)
├── README.md                  # Documentation
└── LICENSE                    # MIT License
```

## Setup

### Prerequisites

- Python 3.9+
- Node.js 16+ and npm
- Google API Key ([Get one from Google AI Studio](https://aistudio.google.com/app/apikey))

### Installation

#### Backend Setup

1. **Clone the repository**

```bash
git clone https://github.com/anuragparashar26/skillscreen.git
cd skillscreen
```

2. **Create virtual environment and install Python dependencies**

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

3. **Start the backend server**

```bash
# Make sure you're in the skillscreen directory with virtual environment activated
python -m uvicorn backend.main:app --reload --port 8000
```

The backend API will be available at `http://localhost:8000`

#### Frontend Setup

1. **Navigate to the frontend directory**

```bash
cd frontend
```

2. **Install Node dependencies**

```bash
npm install
```

3. **Configure environment variables**

```bash
cp .env.example .env
# Edit .env if needed (default points to http://localhost:8000)
```

4. **Start the development server**

```bash
npm start
```

The React app will open at `http://localhost:3000`

## Usage Guide

1. **Enter your Google API Key** in the form (get one from [Google AI Studio](https://aistudio.google.com/app/apikey))
2. **Enter Job Title** (optional) and **Job Description**
3. **Upload resumes** - Drag and drop or browse for PDF/DOCX files (max 5MB each)
4. **Click "Evaluate Resumes"** to run AI-powered scoring
5. **View ranked results** with scores, summaries, and skill analysis
6. **Download CSV** for offline analysis or sharing
7. **Click history items** in the sidebar to view past evaluations (stored in browser)
8. **Delete evaluations** using the delete icon in the sidebar

**Note:** All evaluation history is stored in your browser's localStorage and will persist until you clear browser data.

## API Endpoints

The FastAPI backend provides the following endpoints:

- `GET /` - API status and version
- `GET /health` - Health check
- `POST /api/evaluate` - Evaluate resumes (multipart/form-data)


## How It Works

### Evaluation Pipeline

```
Resume Upload → Text Extraction → Embedding Generation → Similarity + LLM Analysis → Final Score
```

1. **Document Parsing**: PyPDF2 (PDF) and python-docx (DOCX) extract text from uploaded resumes
2. **Embedding Generation**: Google Gemini embeddings (embedding-001) converts text to high-dimensional vectors
3. **Similarity Computation**: Cosine similarity calculated between job description and resume embeddings
4. **LLM Evaluation**: Google Gemini analyzes each resume against the JD using LangChain:
   - Generates a score (0-100)
   - Writes a fit summary (3-5 sentences)
   - Identifies matching skills
   - Identifies missing skills
5. **Score Calculation**: Final score = `(0.6 × LLM Score) + (0.4 × Similarity × 100)`
6. **Ranking**: Candidates sorted by final score in descending order

### Why Hybrid Scoring?

- **Embedding similarity** captures semantic relevance at scale
- **LLM analysis** provides nuanced understanding of qualifications
- **Combined approach** balances speed with accuracy

### Architecture

```
┌─────────────┐         ┌──────────────┐         ┌────────────┐
│   React     │ ──────> │   FastAPI    │ ──────> │   Google   │
│   Frontend  │  HTTP   │   Backend    │   API   │   Gemini   │
│ (localStorage) <────── └──────────────┘ <────── └────────────┘
└─────────────┘
      │
      └─> Document Parsing (PyPDF2/docx)
      └─> Embedding Generation (Gemini)
      └─> LLM Evaluation (LangChain)
```

## Storage

All evaluation history is stored in the browser's localStorage:

| Storage Type      | Description                           | Data Persistence                    |
| ----------------- | ------------------------------------- | ----------------------------------- |
| **localStorage**  | Browser-based client-side storage     | Persists until browser data cleared |

- **Pros**: No backend database needed, instant access, privacy-focused
- **Cons**: Data is device-specific, cleared when browser cache is cleared
- **Capacity**: Up to 5-10MB depending on browser

To export your data, use the CSV download feature for each evaluation.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, FastAPI, and Google Gemini AI**
