from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from db import get_db
from models import FreightRake, CalmWindow

router = APIRouter(prefix="/api/freight", tags=["freight"])


@router.get("/rakes")
def get_rakes(db: Session = Depends(get_db)):
    rows = db.execute(select(FreightRake)).scalars().all()
    return {"rakes": [
        {"id": r.id, "type": r.type, "commodity": r.commodity,
         "origin": r.origin, "destination": r.destination, "loco": r.loco,
         "weight": r.weight, "status": r.status, "corridorSlot": r.corridorSlot,
         "priority": r.priority, "conflictRisk": r.conflictRisk}
        for r in rows
    ]}


@router.get("/calm-windows")
def get_calm_windows(db: Session = Depends(get_db)):
    rows = db.execute(select(CalmWindow)).scalars().all()
    return {"windows": [
        {"section": r.section, "time": r.time, "confidence": r.confidence,
         "reason": r.reason, "recommendation": r.recommendation}
        for r in rows
    ]}


@router.get("/metrics")
def get_metrics():
    """Hardcoded metrics row — matches FE."""
    return {
        "dailyFreightMT": "4.12 MT",
        "activeRakes": "18 Rakes",
        "avgSpeed": "34.8 km/h",
        "calmWindows": "3 High-Confidence",
    }