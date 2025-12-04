# API Registro de Asistencia

## Descripción
API REST simple para gestionar registros de asistencia. Implementada con FastAPI, utilizando estructuras en memoria (listas/diccionarios) sin base de datos ni modelos Pydantic.

## Proyecto
**Registro de Asistencia**: Sistema para registrar y gestionar la asistencia de personas.

### Datos Mínimos
Cada registro de asistencia contiene los siguientes campos:
- `id`: Identificador único (entero, autoincremental)
- `fecha`: Fecha del registro (string)
- `nombre`: Nombre de la persona (string)
- `estado`: Estado de asistencia (string, ej: "presente", "ausente", "tarde")

## Instalación

1. Crear y activar un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   .\venv\Scripts\activate    # Windows (PowerShell)
   ```

2. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

## Ejecución

Ejecutar el servidor:
```bash
uvicorn main:app --reload --port 8000
```

La API estará disponible en: `http://localhost:8000`

Documentación interactiva (Swagger UI): `http://localhost:8000/docs`

## Endpoints

### GET /
Obtiene un mensaje de confirmación de que la API está funcionando.

**Respuesta:**
```json
{
  "mensaje": "API de Registro de Asistencia funcionando"
}
```

### GET /asistencia
Obtiene todos los registros de asistencia.

**Respuesta:**
```json
[
  {
    "id": 1,
    "fecha": "2024-01-15",
    "nombre": "Juan Pérez",
    "estado": "presente"
  },
  {
    "id": 2,
    "fecha": "2024-01-15",
    "nombre": "María García",
    "estado": "ausente"
  }
]
```

### GET /asistencia/{registro_id}
Obtiene un registro de asistencia específico por su ID.

**Parámetros:**
- `registro_id` (path): ID del registro a obtener

**Respuesta exitosa:**
```json
{
  "id": 1,
  "fecha": "2024-01-15",
  "nombre": "Juan Pérez",
  "estado": "presente"
}
```

**Error 404:** Registro no encontrado

### POST /asistencia
Crea un nuevo registro de asistencia.

**Cuerpo de la petición (JSON):**
```json
{
  "fecha": "2024-01-15",
  "nombre": "Juan Pérez",
  "estado": "presente"
}
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "fecha": "2024-01-15",
  "nombre": "Juan Pérez",
  "estado": "presente"
}
```

**Error 400:** Campos requeridos faltantes

### PUT /asistencia/{registro_id}
Actualiza un registro de asistencia existente.

**Parámetros:**
- `registro_id` (path): ID del registro a actualizar

**Cuerpo de la petición (JSON):**
```json
{
  "fecha": "2024-01-16",
  "nombre": "Juan Pérez",
  "estado": "tarde"
}
```

**Respuesta exitosa:**
```json
{
  "id": 1,
  "fecha": "2024-01-16",
  "nombre": "Juan Pérez",
  "estado": "tarde"
}
```

**Error 400:** Campos requeridos faltantes
**Error 404:** Registro no encontrado

### DELETE /asistencia/{registro_id}
Elimina un registro de asistencia por su ID.

**Parámetros:**
- `registro_id` (path): ID del registro a eliminar

**Respuesta exitosa:**
```json
{
  "mensaje": "Registro eliminado",
  "registro": {
    "id": 1,
    "fecha": "2024-01-15",
    "nombre": "Juan Pérez",
    "estado": "presente"
  }
}
```

**Error 404:** Registro no encontrado

## Estructura del Proyecto

```
sistema-reservas/
├── main.py              # Archivo principal de la API
├── requirements.txt     # Dependencias del proyecto
└── README.md           # Este archivo
```

## Características Técnicas

- **Framework:** FastAPI
- **Almacenamiento:** Estructuras en memoria (listas/diccionarios)
- **Sin base de datos:** No se utiliza ninguna base de datos
- **Sin Pydantic:** No se utilizan modelos Pydantic
- **Sin ORM:** No se utiliza ningún ORM

## Notas

- Los datos se almacenan en memoria, por lo que se perderán al reiniciar el servidor.
- El ID se genera automáticamente de forma incremental.
- Todos los campos (`fecha`, `nombre`, `estado`) son requeridos al crear o actualizar un registro.
