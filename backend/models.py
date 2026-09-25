from sqlalchemy import String, Integer, Float, JSON, Text
from sqlalchemy.orm import Mapped, mapped_column
from db import Base


class Corridor(Base):
    __tablename__ = "corridors"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    code: Mapped[str] = mapped_column(String)
    speed: Mapped[str] = mapped_column(String)
    blocks: Mapped[list] = mapped_column(JSON, default=list)


class TacticalDay(Base):
    __tablename__ = "tactical_days"
    code: Mapped[str] = mapped_column(String, primary_key=True)
    day: Mapped[str] = mapped_column(String)
    section: Mapped[str] = mapped_column(String)
    track: Mapped[str] = mapped_column(String)
    type: Mapped[str] = mapped_column(String)
    dept: Mapped[str] = mapped_column(String)
    title: Mapped[str] = mapped_column(Text)
    window: Mapped[str] = mapped_column(String)
    saved: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)
    tsr: Mapped[str] = mapped_column(String)
    pn: Mapped[str] = mapped_column(String)


class StrategicWeek(Base):
    __tablename__ = "strategic_weeks"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    week: Mapped[str] = mapped_column(String)
    title: Mapped[str] = mapped_column(String)
    highlight: Mapped[str] = mapped_column(Text)
    impact: Mapped[str] = mapped_column(Text)
    blocksCount: Mapped[str] = mapped_column(String)
    savings: Mapped[str] = mapped_column(String)
    items: Mapped[list] = mapped_column(JSON, default=list)


class SolverStatus(Base):
    __tablename__ = "solver_status"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    time: Mapped[str] = mapped_column(String)
    conflicts: Mapped[int] = mapped_column(Integer, default=0)
    savedHours: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)
    emergency_active: Mapped[bool] = mapped_column(default=False)

class Defect(Base):
    __tablename__ = "defects"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    dept: Mapped[str] = mapped_column(String)
    deptClass: Mapped[str] = mapped_column(String)
    location: Mapped[str] = mapped_column(String)
    system: Mapped[str] = mapped_column(String)
    description: Mapped[str] = mapped_column(Text)
    metric: Mapped[str] = mapped_column(String)
    duration: Mapped[str] = mapped_column(String)
    priority: Mapped[int] = mapped_column(Integer)
    regulation: Mapped[str] = mapped_column(String)


class Bid(Base):
    __tablename__ = "bids"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    dept: Mapped[str] = mapped_column(String)
    deptClass: Mapped[str] = mapped_column(String)
    section: Mapped[str] = mapped_column(String)
    activity: Mapped[str] = mapped_column(String)
    requestedHours: Mapped[float] = mapped_column(Float)
    urgency: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)

class SmsMessage(Base):
    __tablename__ = "sms_messages"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    sender: Mapped[str] = mapped_column(String)   # 'field' | 'system'
    text: Mapped[str] = mapped_column(Text)
    time: Mapped[str] = mapped_column(String)
    created_at: Mapped[str] = mapped_column(String, default="")


class ParsedBlock(Base):
    __tablename__ = "parsed_blocks"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    section: Mapped[str] = mapped_column(String)
    department: Mapped[str] = mapped_column(String)
    activity: Mapped[str] = mapped_column(String)
    requestedDuration: Mapped[str] = mapped_column(String)
    privateNumber: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)
    timestamp: Mapped[str] = mapped_column(String)

class FreightRake(Base):
    __tablename__ = "freight_rakes"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    type: Mapped[str] = mapped_column(String)
    commodity: Mapped[str] = mapped_column(String)
    origin: Mapped[str] = mapped_column(String)
    destination: Mapped[str] = mapped_column(String)
    loco: Mapped[str] = mapped_column(String)
    weight: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)
    corridorSlot: Mapped[str] = mapped_column(String)
    priority: Mapped[str] = mapped_column(String)
    conflictRisk: Mapped[str] = mapped_column(String)


class CalmWindow(Base):
    __tablename__ = "calm_windows"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    section: Mapped[str] = mapped_column(String)
    time: Mapped[str] = mapped_column(String)
    confidence: Mapped[str] = mapped_column(String)
    reason: Mapped[str] = mapped_column(Text)
    recommendation: Mapped[str] = mapped_column(Text)


class VulnerableSection(Base):
    __tablename__ = "vulnerable_sections"
    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    corridor: Mapped[str] = mapped_column(String)
    hazard: Mapped[str] = mapped_column(String)
    telemetry: Mapped[str] = mapped_column(String)
    action: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String)
    rescheduled: Mapped[bool] = mapped_column(default=False)


class WeatherState(Base):
    __tablename__ = "weather_state"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    monsoon_alert_active: Mapped[bool] = mapped_column(default=False)


class XaiDecision(Base):
    __tablename__ = "xai_decisions"
    block_id: Mapped[str] = mapped_column(String, primary_key=True)
    title: Mapped[str] = mapped_column(String)
    location: Mapped[str] = mapped_column(String)
    timeSlot: Mapped[str] = mapped_column(String)
    confidence: Mapped[int] = mapped_column(Integer)
    reasoning: Mapped[str] = mapped_column(Text)
    shapFactors: Mapped[list] = mapped_column(JSON, default=list)
    regulations: Mapped[list] = mapped_column(JSON, default=list)


class AuditLedgerEntry(Base):
    __tablename__ = "audit_ledger"
    pn: Mapped[str] = mapped_column(String, primary_key=True)
    blockId: Mapped[str] = mapped_column(String)
    section: Mapped[str] = mapped_column(String)
    dept: Mapped[str] = mapped_column(String)
    supervisor: Mapped[str] = mapped_column(String)
    controller: Mapped[str] = mapped_column(String)
    grantedAt: Mapped[str] = mapped_column(String)
    clearedAt: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String)