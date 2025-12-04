# Sistema Reservas - Fullstack (FastAPI + MySQL + Frontend estático)

## Resumen
Proyecto listo para correr localmente usando MySQL (XAMPP) y un frontend estático que consume la API.

## Pasos para ejecutar

1. Inicia XAMPP y activa MySQL.
2. Abre phpMyAdmin y ejecuta sql/schema_mysql.sql para crear la base y tablas.
3. (Opcional) Ejecuta sql/data_mysql.sql para poblar datos de ejemplo.
4. Crea y activa un entorno virtual:
   bash
   python -m venv .venv
   source .venv/bin/activate   # Linux/Mac
   .\.venv\Scripts\activate # Windows (PowerShell) 
   
5. Instala dependencias:
   bash
   pip install -r requirements.txt
   
6. Ejecuta la API:
   bash
   uvicorn app.main:app --reload --port 8000
   
7. Abre frontend/index.html en tu navegador (si usas XAMPP copia la carpeta frontend a htdocs).
   - Si colocas frontend en htdocs, accede por ejemplo: http://localhost/frontend/index.html

## Notas
- La API está en http://localhost:8000.
- Swagger UI: http://localhost:8000/docs
- Si cambias credenciales MySQL, actualiza .env.