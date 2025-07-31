from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.cart import cart_bp
from routes.menu import menu_bp
from routes.orderplaced import order_bp
from routes.Profile.UserDetail import profile_bp
from models.db import db
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
        from models.User import User
        from models.MenuItem import MenuItem
        from models.OrderItem import OrderItem
        from models.Order import Order
        from models.UserProfile import UserProfile
        db.create_all()
        print(" Tables created:", db.metadata.tables.keys())

    return app

if __name__ == '__main__':
    app = create_app()
    print("🚀 Flask is starting...")
    app.run(debug=True)
