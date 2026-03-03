from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime

    model_config = {
        "from attributes": True
    }

class AIRequestCreate(BaseModel):
    text: str
    user_id: int

class AIRequestResponse(BaseModel):
    id: int
    input_text: str
    output_text: str
    created_at: datetime

    class Config:
        from_attributes = True