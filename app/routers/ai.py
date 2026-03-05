
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..services.openai_service import summarize_text, client
from app.auth import get_current_user
from openai import OpenAI
import os
router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/chat", response_model=schemas.AIRequestResponse)
def chat(
    request: schemas.AIRequestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": request.input_text}
        ]
    )

    output_text = response.choices[0].message.content

    db_request = models.AIRequest(
        input_text=request.input_text,
        output_text=output_text,
        user_id=current_user.id
    )

    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    return db_request
@router.post("/summarize", response_model=schemas.AIRequestResponse)
def summarize(
    request: schemas.AIRequestCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Summarize the following text"},
            {"role": "user", "content": request.input_text}
        ]
    )

    output_text = response.choices[0].message.content

    db_request = models.AIRequest(
        input_text=request.input_text,
        output_text=output_text,
        user_id=current_user.id
    )

    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    return db_request

@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user

@router.get("/history", response_model=list[schemas.AIRequestResponse])
def get_history(
        db: Session = Depends(get_db),
        current_user: models.User = Depends(get_current_user)
):
    return  (

        db.query(models.AIRequest)
        .filter(models.AIRequest.user_id==current_user.id)
        .order_by(models.AIRequest.id.desc())
        .all()
    )