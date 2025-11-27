from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class Usuario(Base):
    __tablename__ = "usuario"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    telefono = Column(String(20), unique=True, nullable=False)
    rol = Column(String(20), nullable=False)
    reservas = relationship("Reserva", back_populates="usuario")

class Cancha(Base):
    __tablename__ = "cancha"
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    tipo = Column(String(20), nullable=False)
    ubicacion = Column(String(150))
    estado = Column(String(10), default="activa")
    reservas = relationship("Reserva", back_populates="cancha")

class Reserva(Base):
    __tablename__ = "reserva"
    id = Column(Integer, primary_key=True, autoincrement=True)
    fecha = Column(Date, nullable=False)
    hora_inicio = Column(Time, nullable=False)
    hora_fin = Column(Time, nullable=False)
    estado = Column(String(20), default="pendiente")
    usuario_id = Column(Integer, ForeignKey("usuario.id"))
    cancha_id = Column(Integer, ForeignKey("cancha.id"))
    usuario = relationship("Usuario", back_populates="reservas")
    cancha = relationship("Cancha", back_populates="reservas")
