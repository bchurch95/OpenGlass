from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from enum import Enum

class DeviceVendor(str, Enum):
    OPENWRT = "openwrt"
    CISCO = "cisco"

class DeviceStatus(str, Enum):
    ONLINE = "online"
    OFFLINE = "offline"
    PROVISIONING = "provisioning"
    ERROR = "error"

class SiteBase(BaseModel):
    name: str
    description: Optional[str] = None

class SiteCreate(SiteBase):
    pass

class SiteRead(SiteBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class DeviceBase(BaseModel):
    hostname: str
    mac_address: Optional[str] = None
    model: Optional[str] = None
    vendor: DeviceVendor
    site_id: Optional[int] = None
    ip_address: Optional[str] = None

class DeviceCreate(DeviceBase):
    pass

class DeviceRead(DeviceBase):
    id: int
    status: DeviceStatus
    last_seen: Optional[datetime] = None
    created_at: datetime
    class Config:
        from_attributes = True
