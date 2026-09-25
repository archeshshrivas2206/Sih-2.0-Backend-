from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from db import get_db
from models import Corridor, TacticalDay, StrategicWeek, SolverStatus

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])


@router.get("/corridors")
def get_corridors(db: Session = Depends(get_db)):
    rows = db.execute(select(Corridor)).scalars().all()
    return {"corridors": [
        {"id": r.id, "name": r.name, "code": r.code, "speed": r.speed, "blocks": r.blocks}
        for r in rows
    ]}


@router.get("/tactical")
def get_tactical(db: Session = Depends(get_db)):
    rows = db.execute(select(TacticalDay)).scalars().all()
    return {"days": [
        {"day": r.day, "code": r.code, "section": r.section, "track": r.track,
         "type": r.type, "dept": r.dept, "title": r.title, "window": r.window,
         "saved": r.saved, "status": r.status, "tsr": r.tsr, "pn": r.pn}
        for r in rows
    ]}


@router.get("/strategic")
def get_strategic(db: Session = Depends(get_db)):
    rows = db.execute(select(StrategicWeek)).scalars().all()
    return {"weeks": [
        {"week": r.week, "title": r.title, "highlight": r.highlight,
         "impact": r.impact, "blocksCount": r.blocksCount,
         "savings": r.savings, "items": r.items}
        for r in rows
    ]}


@router.get("/status")
def get_status(db: Session = Depends(get_db)):
    row = db.execute(select(SolverStatus).where(SolverStatus.id == 1)).scalar_one_or_none()
    if not row:
        return {"time": "1.18s", "conflicts": 0, "savedHours": "4.5 hrs",
                "status": "OPTIMAL (CP-SAT v9.8)", "emergency_active": False}
    return {"time": row.time, "conflicts": row.conflicts, "savedHours": row.savedHours,
            "status": row.status, "emergency_active": row.emergency_active}


@router.post("/emergency")
def toggle_emergency(db: Session = Depends(get_db)):
    row = db.execute(select(SolverStatus).where(SolverStatus.id == 1)).scalar_one()
    row.emergency_active = not row.emergency_active
    if row.emergency_active:
        row.time = "0.42s (Emergency Re-Solve)"
        row.savedHours = "6.1 hrs"
        row.status = "INCIDENT ADAPTED (CP-SAT Rescheduled)"
        incident = ("CRITICAL INCIDENT ALERT: Rail Fracture detected at KM 128.40 (UP Main Line). "
                    "CP-SAT has executed automatic emergency re-solve: Diverted 12049 Gatimaan Express "
                    "to DOWN line via SLW (Single Line Working), held BOXN Freight at Okhla loop, "
                    "dispatched Emergency PWI Gang with PN-994112. Speed restriction: TSR 20 km/h active.")
    else:
        row.time = "1.18s"
        row.savedHours = "4.5 hrs"
        row.status = "OPTIMAL (CP-SAT v9.8)"
        incident = None
    db.commit()
    return {"emergency_active": row.emergency_active, "time": row.time,
            "savedHours": row.savedHours, "status": row.status,
            "conflicts": row.conflicts, "incident": incident}