
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from ..services.openai_service import summarize_text

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/summarize", response_model=schemas.AIRequestResponse)
def summarize(request: schemas.AIRequestCreate, db: Session = Depends(get_db)):

    output = summarize_text(request.text)

    db_request = models.AIRequest(
        input_text=request.text,
        output_text=output,
        user_id=request.user_id
    )
    db.add(db_request)
    db.commit()
    db.refresh(db_request)

    return db_request

@router.get("/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()