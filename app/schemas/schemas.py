from pydantic import BaseModel
from typing import Optional
from datetime import date, time

class UsuarioBase(BaseModel):
    nombre: str
    telefono: str
    rol: str

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int
    class Config:
        orm_mode = True

class CanchaBase(BaseModel):
    nombre: str
    tipo: str
    ubicacion: Optional[str] = None
    estado: Optional[str] = "activa"

class CanchaCreate(CanchaBase):
    pass

class Cancha(CanchaBase):
    id: int
    class Config:
        orm_mode = True

class ReservaBase(BaseModel):
    fecha: date
    hora_inicio: time
    hora_fin: time
    estado: Optional[str] = "pendiente"
    usuario_id: Optional[int]
    cancha_id: Optional[int]

class ReservaCreate(ReservaBase):
    pass

class Reserva(ReservaBase):
    id: int
    class Config:
        orm_mode = True
