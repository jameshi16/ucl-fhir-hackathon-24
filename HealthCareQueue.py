from HealthCareData import HealthCareData


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
        #
        patientIdList = []  # initialized from database
        patientPosition = [x for x in self.queue if x.id in patientIdList]
        averagePosition = sum(patientPosition) / len(patientPosition)
        # shift the queue to the right by averagePosition
        queueLeft = [x for x in self.queue if x.priority > averagePosition]
        queueRight = [x for x in self.queue if x.priority <= averagePosition]
        queueLeft.append(patient_data)
        queueLeft.extend(queueRight)
        self.queue = queueLeft
