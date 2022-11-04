from flask_restful import Resource
from ..models import Room, RoomSchema, session
from flask import request

room_schema = RoomSchema()
    
class RoomView(Resource):
    
    def get(self):
        rooms = session.query(Room).all()
        
        return room_schema.dump(rooms, many=True), 200
    
    def post(self):
        data = request.get_json()
        
        # Check if name number and occupant are in the request
        if not all(key in data.keys() for key in ['name', 'number', 'occupant']):
            return {'message': 'Missing required fields: name, number or occupant'}, 400
        
        room = session.query(Room).filter_by(number=data['number']).first()
        if room:
            return {'message': 'Room already exists'}, 400
        
        file = Room(**data)
        session.add(file)
        session.commit()
        
        return room_schema.dump(file), 200
    
    def put(self, id):
        data = request.get_json()
        room = session.query(Room).get(id)
        room.occupant = data['occupant']
        session.commit()
        
        return room_schema.dump(room), 200
    