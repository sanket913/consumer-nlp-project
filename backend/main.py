from fastapi import FastAPI
from pydantic import BaseModel
import pickle
from fastapi.middleware.cors import CORSMiddleware


# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and vectorizer at startup
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)

# Label mapping
label_mapping = {0: 'credit_card', 1: 'credit_reporting', 2: 'debt_collection', 
                 3: 'mortgages_and_loans', 4: 'retail_banking'}

# Request body model
class Complaint(BaseModel):
    text: str

# Home endpoint
@app.get("/")
def home():
    return "Consumer Complaints NLP API is running"

# Predict endpoint
@app.post("/predict")
def predict(data: Complaint):
    # Transform text
    vec = vectorizer.transform([data.text])
    
    # Predict
    pred = model.predict(vec)[0]
    
    return {"category": label_mapping[pred]}
