"""Add logs column to image_builds

Revision ID: 0002_add_logs
Revises: 0001_initial
Create Date: 2025-08-25
"""

from alembic import op
import sqlalchemy as sa

revision = '0002_add_logs'
down_revision = '0001_initial'
branch_labels = None
depends_on = None

def upgrade():
    op.add_column('image_builds', sa.Column('logs', sa.Text(), nullable=True))
    op.alter_column('image_builds', 'logs', new_column_name='logs')
    # set default empty string
    op.execute("UPDATE image_builds SET logs = '' WHERE logs IS NULL")

def downgrade():
    op.drop_column('image_builds', 'logs')
