from app.database import SessionLocal
from app import models
from datetime import datetime

def seed():
    db = SessionLocal()
    if db.query(models.Site).first():
        print("Already seeded")
        return
    site = models.Site(name="HQ", description="Headquarters")
    db.add(site)
    db.commit()
    dev1 = models.Device(
        hostname="ap-hq-01",
        mac_address="aa:bb:cc:dd:ee:01",
        model="TP-Link EAP245",
        vendor=models.DeviceVendor.OPENWRT,
        site_id=site.id,
        ip_address="10.0.0.10",
        status=models.DeviceStatus.ONLINE,
        last_seen=datetime.utcnow()
    )
    dev2 = models.Device(
        hostname="sw-hq-core",
        mac_address="aa:bb:cc:dd:ee:02",
        model="C9300",
        vendor=models.DeviceVendor.CISCO,
        site_id=site.id,
        ip_address="10.0.0.1",
        status=models.DeviceStatus.ONLINE,
        last_seen=datetime.utcnow()
    )
    db.add_all([dev1, dev2])
    db.commit()
    print("Seeded HQ site with 2 devices")

if __name__ == "__main__":
    seed()
