from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from HealthCareData import HealthCareData
from HealthCareQueue import HealthCareQueue
from patient_vector_db import PatientVectorDB, DBFiller

app = FastAPI()

"""
GET /queue
POST /reorder
DELETE /user
POST /patient 
"""

dbfiller = DBFiller()
db = dbfiller.fillDB()
health_care_queue = HealthCareQueue(db)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/queue")
def get_queue():
    return health_care_queue.get_queue()


@app.post("/reorder/{id1, id2}")
def reorder_queue(id1, id2):
    return health_care_queue.reorder_queue(id1, id2)


@app.delete("/user/{user_id}")
def delete_user(user_id: str):
    return health_care_queue.delete_user(user_id)


@app.post("/patient/{patientData}")
def add_patient(patientData):
    patient = HealthCareData(
        patientData["id"], patientData["name"], patientData["conditions"]
    )
    return health_care_queue.add_patient(patient)
