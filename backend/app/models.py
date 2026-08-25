from sqlalchemy import String, Text, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
import enum

from .database import Base

class DeviceVendor(enum.Enum):
    OPENWRT = "openwrt"
    CISCO = "cisco"

class DeviceStatus(enum.Enum):
    ONLINE = "online"
    OFFLINE = "offline"
    PROVISIONING = "provisioning"
    ERROR = "error"

class Site(Base):
    __tablename__ = "sites"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    devices: Mapped[list["Device"]] = relationship(back_populates="site")

class Device(Base):
    __tablename__ = "devices"
    id: Mapped[int] = mapped_column(primary_key=True)
    hostname: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    mac_address: Mapped[str | None] = mapped_column(String(17), unique=True)
    model: Mapped[str | None] = mapped_column(String(128))
    vendor: Mapped[DeviceVendor] = mapped_column(SAEnum(DeviceVendor))
    site_id: Mapped[int | None] = mapped_column(ForeignKey("sites.id"))
    ip_address: Mapped[str | None] = mapped_column(String(45))
    status: Mapped[DeviceStatus] = mapped_column(SAEnum(DeviceStatus), default=DeviceStatus.OFFLINE)
    last_seen: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    site: Mapped[Site | None] = relationship(back_populates="devices")
    configs: Mapped[list["ConfigVersion"]] = relationship(back_populates="device")

class ConfigVersion(Base):
    __tablename__ = "config_versions"
    id: Mapped[int] = mapped_column(primary_key=True)
    device_id: Mapped[int] = mapped_column(ForeignKey("devices.id"))
    version: Mapped[str] = mapped_column(String(64))
    data: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    device: Mapped[Device] = relationship(back_populates="configs")

class ImageBuild(Base):
    __tablename__ = "image_builds"
    id: Mapped[int] = mapped_column(primary_key=True)
    target: Mapped[str] = mapped_column(String(128))
    version: Mapped[str] = mapped_column(String(64))
    variant: Mapped[str | None] = mapped_column(String(128))
    artifact_url: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(32), default="pending")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
