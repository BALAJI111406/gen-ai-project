from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from seating_algorithm import SeatingAlgorithm

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Student(BaseModel):
    id: str
    registerNumber: str
    name: str
    department: str

class Hall(BaseModel):
    id: str
    hallName: str
    rows: int
    columns: int
    capacity: int

class AllocationRequest(BaseModel):
    students: List[Student]
    halls: List[Hall]

@app.post("/allocate")
async def allocate_seats(request: AllocationRequest):
    students = [s.dict() for s in request.students]
    halls = [h.dict() for h in request.halls]
    
    algorithm = SeatingAlgorithm(students, halls)
    allocation = algorithm.allocate()
    
    return {"allocation": allocation, "status": "success"}

@app.get("/")
async def root():
    return {"message": "AI Seating Engine Running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
