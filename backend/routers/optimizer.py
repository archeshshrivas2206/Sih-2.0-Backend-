import random
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session
from db import get_db
from models import Defect, Bid

router = APIRouter(prefix="/api/optimizer", tags=["optimizer"])


class BidIn(BaseModel):
    dept: str
    section: str
    activity: str
    hours: float
    urgency: str


@router.get("/defects")
def get_defects(db: Session = Depends(get_db)):
    rows = db.execute(select(Defect)).scalars().all()
    return {"defects": [
        {"id": r.id, "dept": r.dept, "deptClass": r.deptClass,
         "location": r.location, "system": r.system, "description": r.description,
         "metric": r.metric, "duration": r.duration, "priority": r.priority,
         "regulation": r.regulation}
        for r in rows
    ]}


@router.get("/bids")
def get_bids(db: Session = Depends(get_db)):
    rows = db.execute(select(Bid)).scalars().all()
    return {"bids": [
        {"id": r.id, "dept": r.dept, "deptClass": r.deptClass,
         "section": r.section, "activity": r.activity,
         "requestedHours": r.requestedHours, "urgency": r.urgency,
         "status": r.status}
        for r in rows
    ]}


@router.post("/bids")
def add_bid(payload: BidIn, db: Session = Depends(get_db)):
    # Derive deptClass from dept name (same logic as FE)
    d = payload.dept.lower()
    if "p-way" in d or "pway" in d or "traffic" in d or "operating" in d:
        dept_class = "pway"
    elif "signal" in d or "s&t" in d or "snt" in d:
        dept_class = "snt"
    else:
        dept_class = "trd"

    bid_id = f"BID-{payload.dept[:3].upper()}-{random.randint(100, 999)}"
    row = Bid(
        id=bid_id, dept=payload.dept, deptClass=dept_class,
        section=payload.section, activity=payload.activity,
        requestedHours=payload.hours, urgency=payload.urgency,
        status="CO-LOCATED & BUNDLED"
    )
    db.add(row)
    db.commit()
    return {
        "id": row.id, "dept": row.dept, "deptClass": row.deptClass,
        "section": row.section, "activity": row.activity,
        "requestedHours": row.requestedHours, "urgency": row.urgency,
        "status": row.status
    }


@router.post("/solve")
def solve():
    """Prototype solver — returns the same hardcoded response the FE fakes
    after 1.2s. When we wire in real OR-Tools later, this becomes the entry point."""
    return {
        "status": "OPTIMAL SOLUTION FOUND",
        "solveTime": "1.14s",
        "variables": 4280,
        "constraints": 7640,
        "bundleSavings": "5.5 Track-Hours Saved",
        "passengerDelayAverted": "145 Train-Minutes",
        "allocatedWindow": "00:30 – 04:00 (3.5 Hours)",
        "allocatedDate": "Tomorrow (Wed, 10-Sep-2026)",
        "privateNumber": "PN-884102-DLI",
    }