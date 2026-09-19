import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import make_pipeline
import joblib

# 1. Generate the Synthetic Dataset
# In a real scenario, this would be a CSV with thousands of rows from past placements.
synthetic_data = [
    {"target_role": "Frontend Developer", "skills": "React, HTML, CSS, JavaScript, Tailwind", "score": 95},
    {"target_role": "Frontend Developer", "skills": "HTML, CSS, JavaScript", "score": 60},
    {"target_role": "Frontend Developer", "skills": "Python, SQL", "score": 15},
    
    {"target_role": "Backend Developer", "skills": "Python, FastAPI, PostgreSQL, Docker", "score": 98},
    {"target_role": "Backend Developer", "skills": "Python, SQL", "score": 55},
    {"target_role": "Backend Developer", "skills": "HTML, CSS, React", "score": 10},
    
    {"target_role": "Data Scientist", "skills": "Python, Pandas, Scikit-Learn, SQL, Math", "score": 92},
    {"target_role": "Data Scientist", "skills": "Python, SQL", "score": 45},
    
    {"target_role": "Senior Game Developer", "skills": "C++, Unreal Engine, 3D Math, Physics", "score": 90},
    {"target_role": "Senior Game Developer", "skills": "C#, Unity", "score": 50},
]

print("Loading synthetic data...")
df = pd.DataFrame(synthetic_data)

# 2. Preprocess the Data
# We combine the role and the skills into one text string so the AI can find patterns between them.
df["features"] = df["target_role"] + " " + df["skills"]
X = df["features"]
y = df["score"]

# 3. Build and Train the Machine Learning Pipeline
# TfidfVectorizer converts the text (skills/roles) into a matrix of numbers.
# RandomForestRegressor analyzes those numbers to predict the 0-100 score.
print("Training the scikit-learn model...")
model_pipeline = make_pipeline(
    TfidfVectorizer(),
    RandomForestRegressor(n_estimators=100, random_state=42)
)

model_pipeline.fit(X, y)

# 4. Save the Model to Disk
model_filename = "skill_model.pkl"
joblib.dump(model_pipeline, model_filename)
print(f"Model successfully trained and saved as {model_filename}!")

# 5. Quick Local Test
test_student = "Backend Developer Python PostgreSQL"
predicted_score = model_pipeline.predict([test_student])[0]
print(f"Test Prediction for '{test_student}': {int(predicted_score)}/100")
