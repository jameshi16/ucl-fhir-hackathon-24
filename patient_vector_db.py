import numpy as np
import faiss


class PatientVectorDB:
    def __init__(self, vector_dim):
        self.vector_dim = vector_dim
        self.index = faiss.IndexFlatL2(vector_dim)
        self.patient_ids = []
        self.id_to_pos = {}  # Maps patient IDs to their position in the index

    def add_patient(self, patient_id: str, vector: np.ndarray):
        if patient_id in self.id_to_pos:
            print(f"Patient ID {patient_id} already exists. Use a unique ID.")
            return
        faiss.normalize_L2(vector.reshape(1, -1))
        self.index.add(vector.reshape(1, -1))
        self.patient_ids.append(patient_id)
        self.id_to_pos[patient_id] = len(self.patient_ids) - 1

    def remove_patient(self, patient_id: str):
        if patient_id not in self.id_to_pos:
            print(f"Patient ID {patient_id} not found.")
            return
        pos = self.id_to_pos.pop(patient_id)
        # TODO: Remove the vector from the index

    def search_k_nearest(self, vector: np.ndarray, k: int):
        faiss.normalize_L2(vector.reshape(1, -1))
        D, I = self.index.search(vector.reshape(1, -1), k)
        nearest_ids = [self.patient_ids[i] for i in I[0]]
        return nearest_ids, D


vector_dim = 4  # Number of possible vitals / symptoms
db = PatientVectorDB(vector_dim)

db.add_patient("P001", np.array([1, 0, 1, 0], dtype="float32"))
db.add_patient("P002", np.array([0, 1, 1, 0], dtype="float32"))

new_patient_vector = np.array([1, 0, 1, 1], dtype="float32")
nearest_ids, distances = db.search_k_nearest(new_patient_vector, 1)

print(f"Nearest patient IDs: {nearest_ids}, Distances: {distances}")
