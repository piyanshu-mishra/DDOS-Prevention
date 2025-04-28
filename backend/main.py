from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# Load model
with open('randomforest_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Create FastAPI app
app = FastAPI()

# Allow React frontend to access this API (CORS setup)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify your frontend URL here instead of "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define input data schema
class InputData(BaseModel):
    feature1: float
    feature2: float
    feature3: float
    feature4: float
    # Add more features if you have more

# Define prediction endpoint
@app.post("/predict")
def predict(data: InputData):
    # Convert input to array
    input_array = np.array([[data.feature1, data.feature2, data.feature3, data.feature4]])
    
    # Predict
    prediction = model.predict(input_array)
    
    # Return prediction as JSON
    return {"prediction": prediction.tolist()}
