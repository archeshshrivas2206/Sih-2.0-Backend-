import re
import random
from datetime import datetime
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select, delete
from sqlalchemy.orm import Session
from db import get_db
from models import SmsMessage, ParsedBlock

router = APIRouter(prefix="/api/dispatch", tags=["dispatch"])

IST = "IST"


def _now_ist():
    # For demo we just format local time — real IST conversion is out of scope
    return datetime.now().strftime("%d-%b-%Y %H:%M:%S") + " IST"


def _short_time():
    return datetime.now().strftime("%H:%M") + " " + IST


def _new_pn(section_hint: str = "DLI"):
    return f"PN-{random.randint(100000, 999999)}-{section_hint}"


def _parse_sms(text: str) -> dict:
    """Parse the SMS. Returns a dict with reply text + updated parsed card."""
    t = text.strip()
    upper = t.upper()

    # --- CASE 1: EMERGENCY ---
    if "EMERGENCY" in upper or "RAIL_FRACTURE" in upper or "FRACTURE" in upper:
        sec_match = re.search(r"SEC:([A-Z\-]+)", upper)
        km_match = re.search(r"KM:(\d+(?:-\d+)?)", upper)
        sec = sec_match.group(1) if sec_match else "UNKNOWN"
        km = km_match.group(1) if km_match else "?"
        pn = _new_pn("EMRG")
        return {
            "reply": (f"SAHAYAK RAIL DLI-CONTROL: 🚨 EMERGENCY ACKNOWLEDGED. "
                      f"Rail fracture reported {sec} KM {km}. "
                      f"Emergency possession authorized PN {pn}. "
                      f"TSR 20 km/h imposed immediately. Section Controller & PWI alerted. "
                      f"Reply HOLD if unsafe to proceed."),
            "parsed": {
                "section": f"{sec} (KM {km})",
                "department": "Emergency Response (P-Way + Traffic)",
                "activity": "Emergency Rail Fracture Rectification",
                "requestedDuration": "Emergency (Unscheduled)",
                "privateNumber": pn,
                "status": "EMERGENCY POSSESSION GRANTED",
                "timestamp": _now_ist(),
            },
        }

    # --- CASE 2: BLOCK CLEAR ---
    if "CLEAR" in upper or "RELEASE" in upper:
        pn_match = re.search(r"PN:?\s*([A-Z0-9\-]+)", upper)
        pn_in = pn_match.group(1) if pn_match else "UNKNOWN"
        cancel_pn = f"PN-{random.randint(100000, 999999)}-CANCEL"
        sec_match = re.search(r"SEC:([A-Z\-]+)", upper)
        km_match = re.search(r"KM:(\d+(?:-\d+)?)", upper)
        sec = sec_match.group(1) if sec_match else "NDL-GZB"
        km = km_match.group(1) if km_match else "127-128"
        return {
            "reply": (f"SAHAYAK RAIL DLI-CONTROL: BLOCK CLEARED & CANCELLED. "
                      f"Private Number {cancel_pn} registered. Track returned to Traffic Control. "
                      f"Caution Order 30 km/h active for 24h. Reply OK to acknowledge."),
            "parsed": {
                "section": f"{sec} (KM {km})",
                "department": "Engineering (P-Way)",
                "activity": "Track Cleared & Safe for Traffic",
                "requestedDuration": "Block Complete",
                "privateNumber": cancel_pn,
                "status": "POSSESSION RELINQUISHED (TRACK CLEAR)",
                "timestamp": _now_ist(),
            },
        }

    # --- CASE 3: CONFIRM OCCUPATION ---
    if upper.startswith("CONFIRM") or "TRACK OCCUPIED" in upper:
        pn_match = re.search(r"PN:?\s*([A-Z0-9\-]+)", upper)
        pn_in = pn_match.group(1) if pn_match else "PN-884102-DLI"
        return {
            "reply": (f"SAHAYAK RAIL DLI-CONTROL: OCCUPATION CONFIRMED. "
                      f"PN {pn_in} active. Field gang clocked in. "
                      f"Automatic 3-hour safety timer armed. Reply CLEAR when track released."),
            "parsed": {
                "section": "NDLS – GZB (KM 127.40 – 128.80)",
                "department": "Engineering (P-Way Gang #4)",
                "activity": "Track Occupied – Tamping In Progress",
                "requestedDuration": "3.0 Hours (Active)",
                "privateNumber": pn_in,
                "status": "OCCUPATION CONFIRMED – WORK IN PROGRESS",
                "timestamp": _now_ist(),
            },
        }

    # --- CASE 4: BLOCK REQUEST (default) ---
    sec_match = re.search(r"SEC:([A-Z\-]+)", upper)
    km_match = re.search(r"KM:(\d+(?:-\d+)?)", upper)
    dept_match = re.search(r"DEPT:([A-Z_]+)", upper)
    dur_match = re.search(r"DUR:(\d+)HR", upper)
    type_match = re.search(r"TYPE:([A-Z_]+)", upper)

    sec = sec_match.group(1) if sec_match else "NDL-GZB"
    km = km_match.group(1) if km_match else "127-128"
    dept_code = dept_match.group(1) if dept_match else "ENGG"
    dur = dur_match.group(1) if dur_match else "3"
    typ = type_match.group(1).replace("_", " ").title() if type_match else "Track Maintenance"

    dept_map = {
        "ENGG": "Engineering (P-Way Gang #4)",
        "SNT": "Signal & Telecom (S&T)",
        "S&T": "Signal & Telecom (S&T)",
        "TRD": "Electrical (TRD / OHE)",
        "OHE": "Electrical (TRD / OHE)",
        "OPT": "Operating (Traffic)",
        "TRAFFIC": "Operating (Traffic)",
    }
    dept_name = dept_map.get(dept_code, f"Department ({dept_code})")
    pn = _new_pn("DLI")

    return {
        "reply": (f"SAHAYAK RAIL DLI-CONTROL: BLOCK REQUEST RECEIVED. "
                  f"Window proposed: 01:00-{int(1 + int(dur)):02d}:30 (Bundled if co-located). "
                  f"PRIVATE NUMBER: {pn}. Form T/348M dispatched. Reply CONFIRM to occupy."),
        "parsed": {
            "section": f"{sec.replace('-', ' – ')} (KM {km})",
            "department": dept_name,
            "activity": typ,
            "requestedDuration": f"{dur}.0 Hours",
            "privateNumber": pn,
            "status": "VERIFIED & REGISTERED",
            "timestamp": _now_ist(),
        },
    }


class SmsIn(BaseModel):
    text: str


@router.get("/thread")
def get_thread(db: Session = Depends(get_db)):
    rows = db.execute(select(SmsMessage).order_by(SmsMessage.id)).scalars().all()
    return {"messages": [
        {"sender": r.sender, "text": r.text, "time": r.time} for r in rows
    ]}


@router.get("/parsed")
def get_parsed(db: Session = Depends(get_db)):
    row = db.execute(select(ParsedBlock).where(ParsedBlock.id == 1)).scalar_one_or_none()
    if not row:
        return {}
    return {
        "section": row.section, "department": row.department,
        "activity": row.activity, "requestedDuration": row.requestedDuration,
        "privateNumber": row.privateNumber, "status": row.status,
        "timestamp": row.timestamp,
    }


@router.post("/sms")
def receive_sms(payload: SmsIn, db: Session = Depends(get_db)):
    # Save inbound
    inbound_time = _short_time()
    db.add(SmsMessage(sender="field", text=payload.text, time=inbound_time))

    # Parse
    result = _parse_sms(payload.text)
    reply = result["reply"]
    parsed = result["parsed"]

    # Save reply
    reply_time = _short_time()
    db.add(SmsMessage(sender="system", text=reply, time=reply_time))

    # Upsert parsed card
    row = db.execute(select(ParsedBlock).where(ParsedBlock.id == 1)).scalar_one_or_none()
    if row is None:
        row = ParsedBlock(id=1, **parsed)
        db.add(row)
    else:
        for k, v in parsed.items():
            setattr(row, k, v)

    db.commit()
    return {"reply": reply, "parsed": parsed}


@router.post("/reset")
def reset_thread(db: Session = Depends(get_db)):
    """Handy during demo — clears thread back to 3 seeded messages."""
    db.execute(delete(SmsMessage))
    # Re-add seeds
    seeds = [
        {"sender":"field","text":"BLOCK REQ | SEC:NDL-GZB | KM:127-128 | DEPT:ENGG | TYPE:TRACK_TAMP | DUR:3HR","time":"00:27 IST"},
        {"sender":"system","text":"SAHAYAK RAIL DLI-CONTROL: BLOCK APPROVED. Window: 00:30-04:00 (3.5h Bundled with S&T Point 104). PRIVATE NUMBER: PN-884102-DLI. Caution Order 30 km/h imposed. Reply CONFIRM to occupy track.","time":"00:28 IST"},
        {"sender":"field","text":"CONFIRM | PN:884102-DLI | PWI_SHARMA | TRACK OCCUPIED","time":"00:31 IST"},
    ]
    for m in seeds:
        db.add(SmsMessage(**m))
    db.commit()
    return {"ok": True, "reset": True}