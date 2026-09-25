from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from db import get_db
from models import VulnerableSection, WeatherState

router = APIRouter(prefix="/api/weather", tags=["weather"])


@router.get("/sections")
def get_sections(db: Session = Depends(get_db)):
    rows = db.execute(select(VulnerableSection)).scalars().all()
    return {"sections": [
        {"id": r.id, "name": r.name, "corridor": r.corridor, "hazard": r.hazard,
         "telemetry": r.telemetry, "action": r.action, "status": r.status,
         "rescheduled": r.rescheduled}
        for r in rows
    ]}


@router.get("/state")
def get_state(db: Session = Depends(get_db)):
    row = db.execute(select(WeatherState).where(WeatherState.id == 1)).scalar_one_or_none()
    if not row:
        return {"monsoon_alert_active": False, "auto_rescheduled_blocks": "2 Blocks"}
    return {
        "monsoon_alert_active": row.monsoon_alert_active,
        "auto_rescheduled_blocks": "4 Blocks" if row.monsoon_alert_active else "2 Blocks",
    }


@router.post("/toggle-alert")
def toggle_alert(db: Session = Depends(get_db)):
    row = db.execute(select(WeatherState).where(WeatherState.id == 1)).scalar_one_or_none()
    if row is None:
        row = WeatherState(id=1, monsoon_alert_active=True)
        db.add(row)
    else:
        row.monsoon_alert_active = not row.monsoon_alert_active
    db.commit()

    contingency = None
    if row.monsoon_alert_active:
        contingency = {
            "title": "Automated Monsoon Rescheduling Plan Enacted",
            "desc": "Extreme downpour predicted for Palwal–Kosi Kalan section (110 mm expected in 3 hours). The CP-SAT solver has dynamically adjusted today's schedule:",
            "steps": [
                {"tag": "POSTPONED", "variant": "postponed",
                 "title": "CSM Track Tamping at KM 127",
                 "desc": "Postponed by 48 hours to prevent track bed destabilization on wet ballast."},
                {"tag": "SUBSTITUTED (SAFE ALTERNATIVE)", "variant": "substituted",
                 "title": "Mathura Station Covered Yard S&T Overhaul",
                 "desc": "Gang relocated to covered yard interlocking. Zero downtime wasted!"},
                {"tag": "WATER PATROL ACTIVATED", "variant": "safety",
                 "title": "Yamuna Bridge Water Watch Gang",
                 "desc": "Foot patrol gang equipped with GPS tracker and detonator signals deployed."},
            ],
        }

    return {
        "monsoon_alert_active": row.monsoon_alert_active,
        "auto_rescheduled_blocks": "4 Blocks" if row.monsoon_alert_active else "2 Blocks",
        "contingency": contingency,
    }