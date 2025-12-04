from fastapi import FastAPI, HTTPException, Body

app = FastAPI(title="API Registro de Asistencia")

# Estructura en memoria para almacenar los registros de asistencia
# Cada registro tiene: id, fecha, nombre, estado
registros_asistencia = []
contador_id = 1

@app.get("/")
def root():
    """Endpoint raíz que indica que la API está funcionando"""
    return {"mensaje": "API de Registro de Asistencia funcionando"}

@app.get("/asistencia")
def obtener_todos_los_registros():
    """Obtiene todos los registros de asistencia"""
    return registros_asistencia

@app.get("/asistencia/{registro_id}")
def obtener_registro_por_id(registro_id: int):
    """Obtiene un registro de asistencia por su ID"""
    for registro in registros_asistencia:
        if registro["id"] == registro_id:
            return registro
    raise HTTPException(status_code=404, detail="Registro no encontrado")

@app.post("/asistencia")
def crear_registro(registro: dict = Body(...)):
    """Crea un nuevo registro de asistencia"""
    global contador_id
    
    # Validar que los campos requeridos estén presentes
    campos_requeridos = ["fecha", "nombre", "estado"]
    for campo in campos_requeridos:
        if campo not in registro:
            raise HTTPException(
                status_code=400, 
                detail=f"El campo '{campo}' es requerido"
            )
    
    # Crear el nuevo registro con ID autoincremental
    nuevo_registro = {
        "id": contador_id,
        "fecha": registro["fecha"],
        "nombre": registro["nombre"],
        "estado": registro["estado"]
    }
    
    registros_asistencia.append(nuevo_registro)
    contador_id += 1
    
    return nuevo_registro

@app.put("/asistencia/{registro_id}")
def actualizar_registro(registro_id: int, registro: dict = Body(...)):
    """Actualiza un registro de asistencia existente"""
    for i, reg in enumerate(registros_asistencia):
        if reg["id"] == registro_id:
            # Validar que los campos requeridos estén presentes
            campos_requeridos = ["fecha", "nombre", "estado"]
            for campo in campos_requeridos:
                if campo not in registro:
                    raise HTTPException(
                        status_code=400, 
                        detail=f"El campo '{campo}' es requerido"
                    )
            
            # Actualizar el registro manteniendo el ID original
            registros_asistencia[i] = {
                "id": registro_id,
                "fecha": registro["fecha"],
                "nombre": registro["nombre"],
                "estado": registro["estado"]
            }
            return registros_asistencia[i]
    
    raise HTTPException(status_code=404, detail="Registro no encontrado")

@app.delete("/asistencia/{registro_id}")
def eliminar_registro(registro_id: int):
    """Elimina un registro de asistencia por su ID"""
    for i, registro in enumerate(registros_asistencia):
        if registro["id"] == registro_id:
            registro_eliminado = registros_asistencia.pop(i)
            return {"mensaje": "Registro eliminado", "registro": registro_eliminado}
    
    raise HTTPException(status_code=404, detail="Registro no encontrado")

