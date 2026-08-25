from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from .. import models
from ..schemas_image import ImageBuildCreate
from ..builder_templates import BUILDER_TEMPLATES
import time
import subprocess

router = APIRouter(prefix="/image-builds", tags=["images"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def append_log(build: models.ImageBuild, msg: str):
    build.logs = (build.logs or "") + msg + "\n"

def simulate_build(build_id: int):
    db = SessionLocal()
    try:
        build = db.query(models.ImageBuild).filter(models.ImageBuild.id == build_id).first()
        if not build:
            return
        build.status = "building"
        append_log(build, f"[{build.id}] Build started for {build.target}")
        db.commit()
        template = BUILDER_TEMPLATES.get(build.target.lower(), {})
        profile = build.profile or template.get("profile", build.target)
        packages = build.packages or ",".join(template.get("packages", []))
        version = template.get("version", build.version)
        build.profile = profile
        build.packages = packages
        append_log(build, f"[{build.id}] Using profile {profile}, packages {packages}")
        db.commit()
        cmd = [
            "bash", "-c",
            f"echo 'Fetching OpenWrt {version}'; sleep 1; echo 'Applying profile {profile}'; sleep 1; echo 'Installing packages {packages}'; sleep 1; echo 'Building image...'; sleep 1; echo 'Done'"
        ]
        proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        for line in proc.stdout:
            append_log(build, f"[{build.id}] {line.strip()}")
            db.commit()
        proc.wait()
        build.status = "done"
        build.artifact_url = f"/artifacts/{build.id}.bin"
        append_log(build, f"[{build.id}] Build complete. Artifact: {build.artifact_url}")
        db.commit()
    finally:
        db.close()

@router.get("/{build_id}/logs")
def get_logs(build_id: int, db: Session = Depends(get_db)):
    build = db.query(models.ImageBuild).filter(models.ImageBuild.id == build_id).first()
    if not build:
        raise HTTPException(status_code=404, detail="Build not found")
    logs = (build.logs or "").strip().split("\n")
    # filter empty strings
    logs = [l for l in logs if l]
    return {"logs": logs}

@router.get("/")
def list_builds(db: Session = Depends(get_db)):
    return db.query(models.ImageBuild).all()

@router.post("/")
def create_build(payload: ImageBuildCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    build = models.ImageBuild(**payload.model_dump(), status="pending")
    db.add(build)
    db.commit()
    db.refresh(build)
    background_tasks.add_task(simulate_build, build.id)
    return build
