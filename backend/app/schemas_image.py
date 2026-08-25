from pydantic import BaseModel
from typing import Optional

class ImageBuildCreate(BaseModel):
    target: str
    version: str
    variant: Optional[str] = None
    profile: Optional[str] = None
    packages: Optional[str] = None
