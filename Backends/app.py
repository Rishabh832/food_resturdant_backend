from flask import Flask
from flask_cors import CORS
from Backends.routes.auth import auth_bp
from Backends.routes.cart import cart_bp
from Backends.routes.menu import menu_bp
from Backends.routes.orderplaced import order_bp
from Backends.routes.Profile.UserDetail import profile_bp
from Backends.models.db import db
from flask_jwt_extended import JWTManager
import os

def create_app():
    app = Flask(__name__)
    app.secret_key = "your_secret_key"

    # Ensure absolute path
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    db_path = os.path.join(BASE_DIR, 'instance', 'database.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    app.config['JWT_SECRET_KEY'] = 'super-secret-key'  
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'

    db.init_app(app)
    jwt = JWTManager(app)
    CORS(app,origins=['http://localhost:5173'], supports_credentials=True)

    
    app.register_blueprint(auth_bp)
    app.register_blueprint(cart_bp) 
    app.register_blueprint(menu_bp) 
    app.register_blueprint(profile_bp) 
    app.register_blueprint(order_bp) 

    with app.app_context():
        #  Model imports 
        from Backends.models.User import User
        from Backends.models.MenuItem import MenuItem
        from Backends.models.OrderItem import OrderItem
        from Backends.models.Order import Order
        from Backends.models.UserProfile import UserProfile
        db.create_all()
        print(" Tables created:", db.metadata.tables.keys())

    return app

if __name__ == '__main__':
    app = create_app()
    print("🚀 Flask is starting...")
    app.run(debug=True)

