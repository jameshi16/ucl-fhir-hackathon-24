from HealthCareData import HealthCareData

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

    def create_patient_vector(self, patient_id, patient_condList):
        patient_vector = np.zeros(
            len(self.condList) + len(self.obsList), dtype="float32"
        )
        for cond in patient_condList:
            index = self.condList.index(cond)
            patient_vector[index] = 1

        return patient_vector

    def fillDB(self):
        self.patientDB = PatientVectorDB(
            len(self.condList) + len(self.obsList), self.obsList, self.condList
        )
        for subF in self.subfolders:
            for file in os.listdir("SyntheticDenver/" + subF):
                fData = self.getDataAsJson(
                    "SyntheticDenver/" + subF + "/" + file
                )
                patient_id = fData["entry"][0]["resource"]["id"]
                patient_cond = []
                patient_obs = {}
                for entry in fData["entry"]:
                    if entry["resource"]["resourceType"] == "Condition":
                        patient_cond.append(entry["resource"]["code"]["text"])
                    if entry["resource"]["resourceType"] == "Observation":
                        index = self.obsList.index(
                            entry["resource"]["code"]["text"]
                        )
                        try:
                            patient_obs[index + len(self.condList)] = int(
                                entry["resource"]["valueQuantity"]["value"]
                            )
                        except KeyError:
                            patient_obs[index + len(self.condList)] = 1

                patient_vector = self.create_patient_vector(
                    patient_id, patient_cond
                )
                for key in patient_obs.keys():
                    patient_vector[key] = patient_obs[key]
                self.patientDB.add_patient_vector(patient_id, patient_vector)

        return self.patientDB


class PatientVectorDB:
    def __init__(self, vector_dim, obs_list, cond_list):
        self.vector_dim = vector_dim
        self.index = faiss.IndexFlatL2(vector_dim)
        self.patient_ids = []
        self.id_to_pos = {}  # Maps patient IDs to their position in the index
        self.obs_list = obs_list
        self.cond_list = cond_list

    def create_patient_vector(self, patient_condList):
        patient_vector = np.zeros(len(self.cond_list) + len(self.obs_list))

        for cond in patient_condList:
            index = self.cond_list.index(cond)
            patient_vector[index] = 1

        return patient_vector

    def add_patient_vector(self, patient_id: str, vector: np.ndarray):
        if patient_id in self.id_to_pos:
            print(f"Patient ID {patient_id} already exists. Use a unique ID.")
            return
        faiss.normalize_L2(vector.reshape(1, -1))
        self.index.add(vector.reshape(1, -1))
        self.patient_ids.append(patient_id)
        self.id_to_pos[patient_id] = len(self.patient_ids) - 1

    def add_patient(self, patient: HealthCareData):
        patient_vector = self.create_patient_vector(patient.get_conditions())
        self.add_patient_vector(patient.get_id(), patient_vector)

    def remove_patient(self, patient_id: str):
        if patient_id not in self.id_to_pos:
            print(f"Patient ID {patient_id} not found.")
            return
        pos = self.id_to_pos.pop(patient_id)
        # TODO: Remove the vector from the index

    def search_k_nearest_vector(self, vector: np.ndarray, k: int):
        faiss.normalize_L2(vector.reshape(1, -1))
        D, I = self.index.search(vector.reshape(1, -1), k)
        nearest_ids = [self.patient_ids[i] for i in I[0]]
        return nearest_ids, D

    def search_k_nearest_patient(self, patient_id: str, k: int):
        if patient_id not in self.id_to_pos:
            print(f"Patient ID {patient_id} not found.")
            return
        pos = self.id_to_pos[patient_id]
        vector = self.index.reconstruct(pos)
        return self.search_k_nearest_vector(vector, k)
