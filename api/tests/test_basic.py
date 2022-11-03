import json
from unittest import TestCase

from api.app import app


class TestBasic(TestCase):

    def setUp(self):
        self.client = app.test_client()

    def test_hello_world(self):
        '''Test that the hello world route returns a 200 status code and a specific message'''
        
        request = self.client.get('/api/test')
        
        self.assertEqual(request.status_code, 200)        
