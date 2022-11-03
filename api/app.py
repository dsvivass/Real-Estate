from . import create_app
from .models import create_all
from .views import TestView
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = create_app('default')

app_context = app.app_context()
app_context.push()

create_all()
cors = CORS(app)
api = Api(app)

api.add_resource(TestView, '/api/test')
jwt = JWTManager(app)
