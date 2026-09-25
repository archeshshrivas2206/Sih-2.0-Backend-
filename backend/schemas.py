from pydantic import BaseModel
from typing import List, Optional, Any


class CorridorOut(BaseModel):
    id: str
    name: str
    code: str
    speed: str
    blocks: List[Any]


class TacticalDayOut(BaseModel):
    day: str
    code: str
    section: str
    track: str
    type: str
    dept: str
    title: str
    window: str
    saved: str
    status: str
    tsr: str
    pn: str


class StrategicWeekOut(BaseModel):
    week: str
    title: str
    highlight: str
    impact: str
    blocksCount: str
    savings: str
    items: List[str]


class StatusOut(BaseModel):
    time: str
    conflicts: int
    savedHours: str
    status: str
    emergency_active: bool


class LoginRequest(BaseModel):
    name: Optional[str] = None
    department: Optional[str] = None
    role: Optional[str] = None
    division: Optional[str] = None
    authType: Optional[str] = None
    scrCode: Optional[str] = None