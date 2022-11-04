import json
from unittest import TestCase
import random

from api.app import app

def random_number_between(start, end):
    return random.randint(start, end)

class TestRooms(TestCase):

    def setUp(self):
        self.client = app.test_client()
        
    def test_get_all_rooms(self):
        '''Test that all rooms can be retrieved'''
        
        endpoint = "/api/rooms"
        request = self.client.get(endpoint)
        
        self.assertEqual(request.status_code, 200)

    def test_new_room(self):
        '''Test that a new room can be created'''
        
        room_number = random_number_between(9999, 999999)
        self.number_created = room_number
        
        new_room = {'name': f'Room {room_number}', 'number': room_number, 'occupant': 'John Doe'}
        
        endpoint = "/api/rooms"
        headers = {'Content-Type': 'application/json'}

        request = self.client.post(
            endpoint,
            data=json.dumps(new_room),
            headers=headers)
        
        self.assertEqual(request.status_code, 200)    
        
    def test_room_without_all_fields(self):
        '''Test without all fields'''
        
        room_number = random_number_between(9999, 999999)
        
        new_room = {'name': f'Room {room_number}', 'number': room_number}
        
        endpoint = "/api/rooms"
        headers = {'Content-Type': 'application/json'}

        request = self.client.post(
            endpoint,
            data=json.dumps(new_room),
            headers=headers)
        
        self.assertEqual(request.status_code, 400)
        self.assertEqual(request.json['message'], 'Missing required fields: name, number or occupant')    
        
    def test_room_with_existing_number(self):
        '''Test that a room with an existing number cannot be created'''
        
        room_number = random_number_between(9999, 999999)
        
        new_room = {'name': f'Room {room_number}', 'number': room_number, 'occupant': 'John Doe'}
        
        endpoint = "/api/rooms"
        headers = {'Content-Type': 'application/json'}

        request = self.client.post(
            endpoint,
            data=json.dumps(new_room),
            headers=headers)
        
        self.assertEqual(request.status_code, 200)    
        
        request = self.client.post(
            endpoint,
            data=json.dumps(new_room),
            headers=headers)
        
        self.assertEqual(request.status_code, 400)
        self.assertEqual(request.json['message'], 'Room already exists')
        
    def test_update_room(self):
        '''Test that a room can be updated'''
        
        room_number = random_number_between(9999, 999999)
        
        new_room = {'name': f'Room {room_number}', 'number': room_number, 'occupant': 'John Doe'}
        
        endpoint = "/api/rooms"
        headers = {'Content-Type': 'application/json'}

        request = self.client.post(
            endpoint,
            data=json.dumps(new_room),
            headers=headers)
        
        self.assertEqual(request.status_code, 200)    
        
        room_id = request.json['id']
        
        endpoint = f"/api/rooms/{room_id}"
        headers = {'Content-Type': 'application/json'}

        request = self.client.put(
            endpoint,
            data=json.dumps({'occupant': 'Jane Doe'}),
            headers=headers)
        
        self.assertEqual(request.status_code, 200)
        self.assertEqual(request.json['occupant'], 'Jane Doe')
        
    def test_delete_room(self):
        '''Test that a room can be deleted'''
        
        room_number = random_number_between(9999, 999999)
        
        new_room = {'name': f'Room {room_number}', 'number': room_number, 'occupant': 'John Doe'}
        
        endpoint = "/api/rooms"
        headers = {'Content-Type': 'application/json'}

        request = self.client.post(
            endpoint,
            data=json.dumps(new_room),
            headers=headers)
        
        self.assertEqual(request.status_code, 200)    
        
        room_id = request.json['id']
        
        endpoint = f"/api/rooms/{room_id}"
        headers = {'Content-Type': 'application/json'}

        request = self.client.delete(
            endpoint,
            headers=headers)
        
        self.assertEqual(request.status_code, 200)
        self.assertEqual(request.json['message'], 'Room deleted succesfully')
