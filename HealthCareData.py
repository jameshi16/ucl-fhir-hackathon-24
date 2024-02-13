from pydantic import BaseModel


class HealthCareData(BaseModel):
    id: str
    name: str
    conditions: list[str]
