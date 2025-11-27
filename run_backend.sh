#!/usr/bin/env bash
# Activate venv if exists, then run uvicorn
if [ -f ".venv/bin/activate" ]; then
  source .venv/bin/activate
fi
uvicorn app.main:app --reload --port 8000
