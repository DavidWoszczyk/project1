from fastapi import FastAPI
from .database import engine, Base
from .routers import users, ai
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

Base.metadata.create_all(bind=engine)
app = FastAPI(title="AI Backend Pro")

origins = [
    "http://localhost:3000",
    "https://project1-1-mk3a.onrender.com"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(users.router)
app.include_router(ai.router)


@app.get("/")
def root():
    return {"message": "AI Backend Pro API is running"}