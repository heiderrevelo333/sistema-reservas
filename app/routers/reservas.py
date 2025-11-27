from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.models import Reserva as ReservaModel
from app.schemas.schemas import Reserva as ReservaSchema, ReservaCreate
from sqlalchemy import and_

router = APIRouter(prefix="/reservas", tags=["Reservas"])

@router.get("/", response_model=list[ReservaSchema])
def listar(db: Session = Depends(get_db)):
    return db.query(ReservaModel).all()

@router.post("/", response_model=ReservaSchema)
def crear(data: ReservaCreate, db: Session = Depends(get_db)):
    # simple overlap check
    if data.cancha_id:
        conflict = db.query(ReservaModel).filter(
            ReservaModel.cancha_id == data.cancha_id,
            ReservaModel.fecha == data.fecha,
            ReservaModel.hora_inicio < data.hora_fin,
            ReservaModel.hora_fin > data.hora_inicio
        ).first()
        if conflict:
            raise HTTPException(400, "Solapamiento con otra reserva")
    r = ReservaModel(**data.dict())
    db.add(r)
    db.commit()
    db.refresh(r)
    return r
