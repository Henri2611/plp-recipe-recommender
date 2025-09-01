# 🍲 AI Recipe Recommender

An AI-powered recipe recommender app that suggests meals based on selected ingredients.  
Built with **Flask**, **MySQL**, **Groq API**, and a simple **HTML/CSS/JS frontend**.  

---

## ✨ Features
- Select ingredients and generate recipes.
- Uses **Groq API** for natural language recipe generation.
- Recipes are logged into a **MySQL database**.
- Simple, responsive **HTML/CSS/JS frontend**.
- Styled with an **Indian-themed UI**.

---

## 🛠️ Tech Stack
- **Backend:** Flask (Python)
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript
- **AI API:** Groq API

---

---
## 📂 Project Structure
recipe-recommender/
├── backend/
│ ├── app.py # Flask backend
│ ├── config.py # DB + API configuration
│ ├── requirements.txt # Python dependencies
│ ├── .env # Environment variables (not uploaded to GitHub)
│ └── venv/ # Virtual environment (not uploaded to GitHub)
│
├── database/
│ └── schema.sql # MySQL schema (tables and setup)
│
├── frontend/
│ ├── css/
│ │ └── style.css # Stylesheet (Indian theme)
│ ├── js/
│ │ └── script.js # Frontend logic
│ └── index.html # Main UI
│
├── .gitignore # Files/folders to ignore in Git
└── README.md # Project documentation
---
---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/recipe-recommender.git
cd recipe-recommender



### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
pip install -r requirements.txt

