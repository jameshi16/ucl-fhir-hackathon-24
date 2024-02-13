import json
import os


class DataPuller:

    def __init__(self):
        pass
        # self.subfolders = os.listdir('synthetic_denver')

    def getDataAsJson(self, filename):
        with open(filename) as f:
            data = json.load(f)
        return data

    def pullData(self):
        resSet = set()
        for subF in subFolders:
            for file in os.listdir('synthetic_denver/' + subF):
                fData = self.getDataAsJson('synthetic_denver/' + subF + '/' + file)
                for entry in fData['entry']:
                    if entry['resource']['resourceType'] == 'Condition':
                        resSet.add(entry['resource']['code']['text'])
        return resSet

    def pullTest(self):
        resSet = set()
        folder = 'GotR'
        for file in os.listdir(folder):
            fData = self.getDataAsJson(f"{folder}/{file}")
            for entry in fData['entry']:
                if entry['resource']['resourceType'] == 'Condition':
                    resSet.add(entry['resource']['code']['text'])

        return resSet


d = DataPuller()
r = d.pullTest()
print(r)