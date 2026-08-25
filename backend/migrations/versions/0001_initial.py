"""Initial models

Revision ID: 0001_initial
Revises: 
Create Date: 2025-08-25
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '0001_initial'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table('sites',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=128), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name')
    )
    op.create_table('devices',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('hostname', sa.String(length=128), nullable=False),
        sa.Column('mac_address', sa.String(length=17), nullable=True),
        sa.Column('model', sa.String(length=128), nullable=True),
        sa.Column('vendor', postgresql.ENUM('openwrt', 'cisco', name='devicevendor'), nullable=False),
        sa.Column('site_id', sa.Integer(), nullable=True),
        sa.Column('ip_address', sa.String(length=45), nullable=True),
        sa.Column('status', postgresql.ENUM('online', 'offline', 'provisioning', 'error', name='devicestatus'), nullable=False),
        sa.Column('last_seen', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['site_id'], ['sites.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('hostname'),
        sa.UniqueConstraint('mac_address')
    )
    op.create_table('config_versions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('device_id', sa.Integer(), nullable=False),
        sa.Column('version', sa.String(length=64), nullable=False),
        sa.Column('data', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['device_id'], ['devices.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table('image_builds',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('target', sa.String(length=128), nullable=False),
        sa.Column('version', sa.String(length=64), nullable=False),
        sa.Column('variant', sa.String(length=128), nullable=True),
        sa.Column('artifact_url', sa.Text(), nullable=True),
        sa.Column('status', sa.String(length=32), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('image_builds')
    op.drop_table('config_versions')
    op.drop_table('devices')
    op.drop_table('sites')
