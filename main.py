from fastapi import FastAPI
from HealthCareData import HealthCareData
from HealthCareQueue import HealthCareQueue

app = FastAPI()

"""
GET /queue
POST /reorder
DELETE /user
POST /patient 
"""

health_care_queue = HealthCareQueue()


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
def add_patient(patientData: HealthCareData):
    return health_care_queue.add_patient(patientData)
