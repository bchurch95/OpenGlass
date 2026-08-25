from pydantic import BaseModel
from typing import Optional

class ImageBuildCreate(BaseModel):
    target: str
    version: str
    variant: Optional[str] = None
