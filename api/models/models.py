from .connection import session, get_engine_from_settings
from sqlalchemy.ext.declarative import declarative_base
from flask_sqlalchemy import SQLAlchemy
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

db = SQLAlchemy()
Base = declarative_base()
session = session
    
class Room(Base):
    __tablename__ = 'rooms'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    number = db.Column(db.Integer, unique=True, nullable=False)
    occupant = db.Column(db.String(128))
    
class RoomSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Room
        include_relationships = True
        load_instance = True
        raise_on_error = True
        
class create_all():
    engine = get_engine_from_settings()
    # Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)