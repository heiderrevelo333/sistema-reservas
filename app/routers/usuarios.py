from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.models import Usuario as UsuarioModel
from app.schemas.schemas import Usuario as UsuarioSchema, UsuarioCreate

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])

@router.get("/", response_model=list[UsuarioSchema])
def listar(db: Session = Depends(get_db)):
    return db.query(UsuarioModel).all()

@router.post("/", response_model=UsuarioSchema)
def crear(data: UsuarioCreate, db: Session = Depends(get_db)):
    u = UsuarioModel(**data.dict())
    db.add(u)
    db.commit()
    db.refresh(u)
    return u
