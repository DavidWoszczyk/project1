from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    created_at: datetime

    model_config = {
        "from attributes": True
    }

class AIRequestCreate(BaseModel):
    input_text: str

class AIRequestResponse(BaseModel):
    id: int
    input_text: str
    output_text: str
    created_at: datetime

    class Config:
        from_attributes = True