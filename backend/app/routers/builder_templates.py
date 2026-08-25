from fastapi import APIRouter
from ..builder_templates import BUILDER_TEMPLATES

router = APIRouter(prefix="/builder-templates", tags=["builder"])

@router.get("/")
def list_templates():
    return BUILDER_TEMPLATES
