import numpy as np
import faiss
import os
import json


class DBFiller:
    def __init__(self):
        self.patientDB = None
        self.subfolders = os.listdir("SyntheticDenver")
        self.condlist = []
        self.obslist = []
        self.pullData()

    def getDataAsJson(self, filename):
        with open(filename, encoding="utf-8") as f:
            data = json.load(f)
        return data

    def pullData(self):
        condSet = set()
        obsSet = set()
        for subF in self.subfolders:
            for file in os.listdir("SyntheticDenver/" + subF):
                fData = self.getDataAsJson(
                    "SyntheticDenver/" + subF + "/" + file
                )
                for entry in fData["entry"]:
                    if entry["resource"]["resourceType"] == "Condition":
                        condSet.add(entry["resource"]["code"]["text"])
                    if entry["resource"]["resourceType"] == "Observation":
                        obsSet.add(entry["resource"]["code"]["text"])

        self.condList = list(condSet)
        self.obsList = list(obsSet)
        self.condList.sort()
        self.obsList.sort()

    def fillDB(self):
        self.patientDB = PatientVectorDB(
            len(self.condList) + len(self.obsList)
        )
        for subF in self.subfolders:
            for file in os.listdir("SyntheticDenver/" + subF):
                fData = self.getDataAsJson(
                    "SyntheticDenver/" + subF + "/" + file
                )
                patient_vector = np.zeros(
                    len(self.condList) + len(self.obsList), dtype="float32"
                )
                patient_id = fData["entry"][0]["resource"]["id"]
                for entry in fData["entry"]:
                    if entry["resource"]["resourceType"] == "Condition":
                        index = self.condList.index(
                            entry["resource"]["code"]["text"]
                        )
                        patient_vector[index] = 1
                    if entry["resource"]["resourceType"] == "Observation":
                        index = self.obsList.index(
                            entry["resource"]["code"]["text"]
                        )
                        try:
                            patient_vector[index + len(self.condList)] = int(
                                entry["resource"]["valueQuantity"]["value"]
                            )
                        except KeyError:
                            patient_vector[index + len(self.condList)] = 1
                self.patientDB.add_patient(patient_id, patient_vector)

        return self.patientDB


class PatientVectorDB:
    def __init__(self, vector_dim):
        self.vector_dim = vector_dim
        self.index = faiss.IndexFlatL2(vector_dim)
        self.patient_ids = []
        self.id_to_pos = {}  # Maps patient IDs to their position in the index

    def add_patient(self, patient_id: str, vector: np.ndarray):
        if patient_id in self.id_to_pos:
            # print(f"Patient ID {patient_id} already exists. Use a unique ID.")
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


if __name__ == "__main__":
    dbFiller = DBFiller()
    db = dbFiller.fillDB()
