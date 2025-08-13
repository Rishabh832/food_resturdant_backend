from flask import Flask
from flask_cors import CORS
import os
import sys


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(BASE_DIR)
if ROOT_DIR not in sys.path:
    sys.path.append(ROOT_DIR)


from Backends.routes.auth import auth_bp
from Backends.routes.cart import cart_bp
from Backends.routes.menu import menu_bp
from Backends.routes.orderplaced import order_bp
from Backends.routes.Profile.UserDetail import profile_bp
from Backends.models.db import db
from flask_jwt_extended import JWTManager


def create_app():
    app = Flask(__name__)
    app.secret_key = "your_secret_key"

    # Database path
    db_path = os.path.join(BASE_DIR, 'instance', 'database.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # JWT Config
    app.config['JWT_SECRET_KEY'] = 'super-secret-key'
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'

    db.init_app(app)
    jwt = JWTManager(app)

    # Allow frontend
    CORS(app, origins=['http://localhost:5173',"https://food-resturdant-backend-1.onrender.com"], supports_credentials=True)

    # Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(cart_bp)
    app.register_blueprint(menu_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(order_bp)

    with app.app_context():
        # Model imports
        from Backends.models.User import User
        from Backends.models.MenuItem import MenuItem
        from Backends.models.OrderItem import OrderItem
        from Backends.models.Order import Order
        from Backends.models.UserProfile import UserProfile
        db.create_all()
        print("Tables created:", db.metadata.tables.keys())

    return app


app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  
    print(f"🚀 Flask is starting on port {port}...")
    app.run(host="0.0.0.0", port=port)
