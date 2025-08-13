from flask import Blueprint, jsonify, request, current_app, session
import sqlite3
from Backends.models.db import db
from Backends.models.User import User

menu_bp = Blueprint('menu', __name__, url_prefix='/api/menu')

# 🔧 Connect to SQLite DB
def menu_db_connection():
    db_path = current_app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

# 🔐 Check if logged-in user is admin
def is_admin():
    username = session.get('username')
    if not username:
        return False
    user = db.session.query(User).filter_by(username=username).first()
    return user and user.role == 'admin'

# ✅ Public: Get all menu items
@menu_bp.route('/', methods=["GET"])
def get_menu():
    conn = menu_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM menu_item")
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(items)

# 🔐 Admin Only: Add new menu item
@menu_bp.route('/add', methods=["POST"])
def add_menu():
    if not is_admin():
        return jsonify({"error": "Access denied"}), 403

    data = request.get_json()
    name = data['name']
    description = data['description']
    image = data['image']
    price = data['price']
    category = data['category']

    conn = menu_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO menu_item (name, description, image, price, category) VALUES (?, ?, ?, ?, ?)",
                       (name, description, image, price, category))
        conn.commit()
        conn.close()
        return jsonify({"message": "Item added to menu"})
    except Exception as e:
        return jsonify({"error": "Item not added", "details": str(e)})

# 🔐 Admin Only: Remove menu item
@menu_bp.route('/remove/<int:item_id>', methods=["DELETE"])
def remove_menu(item_id):
    if not is_admin():
        return jsonify({"error": "Access denied"}), 403

    conn = menu_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM menu_item WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Item deleted"})

# 🔐 Admin Only: Update menu item
@menu_bp.route('/update/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    if not is_admin():
        return jsonify({"error": "Access denied"}), 403

    data = request.get_json()
    name = data['name']
    description = data['description']
    image = data['image']
    price = data['price']
    category = data['category']

    conn = menu_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE menu_item SET name=?, description=?, image=?, price=?, category=? WHERE id=?",
                   (name, description, image, price, category, item_id))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Item updated'})
