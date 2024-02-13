from HealthCareData import HealthCareData
import random


class HealthCareQueue:
    def __init__(self, patient_db, initial_queue=None):
        if initial_queue is None:
            initial_queue = []
        self.queue = initial_queue
        self.patient_db = patient_db
        self.init_random_queue(10)

    def get_queue(self):
        return self.queue

    def init_random_queue(self, num_patients):
        ids = self.patient_db.patient_ids
        random.shuffle(ids)
        ids = ids[:num_patients]
        self.queue = [self.patient_db.get_patient(id) for id in ids]

    def reorder_queue(self, id1, id2):
        self.queue[id1], self.queue[id2] = self.queue[id2], self.queue[id1]
        return self.queue

    def delete_user(self, user_id):
        self.queue = [x for x in self.queue if x.user_id != user_id]
        return self.queue

    def add_patient(self, patient_data: HealthCareData):
        self.patient_db.add_patient(patient_data)
        patientIdList = self.patient_db.search_k_nearest_patient(
            patient_data.get_id(), 5
        )
        patientPosition = [x for x in self.queue if x.id in patientIdList]
        averagePosition = sum(patientPosition) / len(patientPosition)

        queueLeft = [x for x in self.queue if x.priority > averagePosition]
        queueRight = [x for x in self.queue if x.priority <= averagePosition]
        queueLeft.append(patient_data)
        queueLeft.extend(queueRight)
        self.queue = queueLeft
