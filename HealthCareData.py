class HealthCareData:

    def __init__(self, id, name, conditions):
        self.id = id
        self.name = name
        self.conditions = conditions

    def get_id(self):
        return self.id

    def get_name(self):
        return self.name

    def get_conditions(self):
        return self.conditions
