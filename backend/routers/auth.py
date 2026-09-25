from fastapi import APIRouter
from schemas import LoginRequest

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login")
async def login(payload: LoginRequest):
    """Stub — frontend currently uses localStorage only.
    Returns the same shape so FE can swap to this endpoint when ready."""
    return {
        "ok": True,
        "user": payload.model_dump(exclude_none=True),
    }