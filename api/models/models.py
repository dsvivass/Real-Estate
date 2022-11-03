from .connection import session, get_engine_from_settings
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class create_all():
    engine = get_engine_from_settings()
    # Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)