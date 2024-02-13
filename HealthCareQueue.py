from HealthCareData import HealthCareData
from patient_vector_db import PatientVectorDB, DBFiller

class HealthCareQueue:
    def __init__(self, initial_queue=None):
        if initial_queue is None:
            initial_queue = []
        self.queue = initial_queue

    def get_queue(self):
        return self.queue

    def reorder_queue(self, id1, id2):
        self.queue[id1], self.queue[id2] = self.queue[id2], self.queue[id1]
        return self.queue

    def delete_user(self, user_id):
        self.queue = [x for x in self.queue if x.user_id != user_id]
        return self.queue

    def add_patient(self, patient_data: HealthCareData):

        patient_vector = DBFiller.create_patient_vector(patient_data)
        patientIdList = PatientVectorDB.search_k_nearest(patient_vector, 1)
        patientPosition = [x for x in self.queue if x.id in patientIdList]
        averagePosition = sum(patientPosition) / len(patientPosition)

        queueLeft = [x for x in self.queue if x.priority > averagePosition]
        queueRight = [x for x in self.queue if x.priority <= averagePosition]
        queueLeft.append(patient_data)
        queueLeft.extend(queueRight)
        self.queue = queueLeft
