from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from db import get_db
from models import XaiDecision, AuditLedgerEntry

router = APIRouter(prefix="/api/audit", tags=["audit"])


@router.get("/xai/{block_id}")
def get_xai(block_id: str, db: Session = Depends(get_db)):
    row = db.execute(
        select(XaiDecision).where(XaiDecision.block_id == block_id)
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=404, detail="No XAI decision for that block")
    return {
        "title": row.title,
        "location": row.location,
        "timeSlot": row.timeSlot,
        "confidence": row.confidence,
        "reasoning": row.reasoning,
        "shapFactors": row.shapFactors,
        "regulations": row.regulations,
    }


@router.get("/ledger")
def get_ledger(db: Session = Depends(get_db)):
    rows = db.execute(select(AuditLedgerEntry)).scalars().all()
    return {"ledger": [
        {"pn": r.pn, "blockId": r.blockId, "section": r.section, "dept": r.dept,
         "supervisor": r.supervisor, "controller": r.controller,
         "grantedAt": r.grantedAt, "clearedAt": r.clearedAt, "status": r.status}
        for r in rows
    ]}


@router.get("/stats")
def get_stats():
    return {
        "regulatoryCompliance": "100% Verified",
        "activePrivateNumbers": "24 Tokens",
        "tamperProofEvents": "1,420 Events",
        "decisionTransparency": "Full XAI (SHAP)",
    }