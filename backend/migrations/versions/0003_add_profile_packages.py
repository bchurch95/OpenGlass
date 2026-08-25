"""Add profile and packages to image_builds

Revision ID: 0003_add_profile_packages
Revises: 0002_add_logs
Create Date: 2025-08-25
"""

from alembic import op
import sqlalchemy as sa

revision = '0003_add_profile_packages'
down_revision = '0002_add_logs'
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('image_builds', sa.Column('profile', sa.String(length=128), nullable=True))
    op.add_column('image_builds', sa.Column('packages', sa.Text(), nullable=True))

def downgrade():
    op.drop_column('image_builds', 'packages')
    op.drop_column('image_builds', 'profile')
