from fastapi import FastAPI
from .database import engine, Base
from .routers import users, ai

Base.metadata.create_all(bind=engine)
app = FastAPI(title="AI Backend Pro")

app.include_router(users.router)
app.include_router(ai.router)