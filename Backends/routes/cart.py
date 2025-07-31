from flask import Blueprint,session,url_for,request,jsonify
from flask_cors import CORS
import sqlite3
from models import MenuItem,Order,OrderItem,User
from models.db import db

cart_bp = Blueprint('cart',__name__, url_prefix='/api/cart')

# Add to cart items

def cart_db_connection():
    conn = sqlite3.connect('instance/database.db')
    conn.row_factory = sqlite3.Row
    return conn

@cart_bp.route('/add_cart', methods=["POST"])
def add_to_cart():
    if 'user_id' not in session:
        return jsonify({"error": "unauthorised please login"}), 401
    
    data = request.get_json()
    item_id = data.get('item_id')

    if not item_id:
        return jsonify({'error':'item id is required'}),400

    conn = cart_db_connection()
    cursor = conn.cursor()

  
    cursor.execute("SELECT * FROM menu_item WHERE id=?", (item_id,))
    item = cursor.fetchone()
    if not item:
        conn.close()
        return jsonify({'error': 'item not found'}), 404

   
    cursor.execute(
        "SELECT * FROM order_item WHERE user_id=? AND menu_item_id=?",
        (session['user_id'], item_id)
    )
    order_item = cursor.fetchone()

    try:
        if order_item:
            
            cursor.execute(
                "UPDATE order_item SET quantity = quantity + 1 WHERE user_id=? AND menu_item_id=?",
                (session['user_id'], item_id)
            )
        else:
           
            cursor.execute(
                "INSERT INTO order_item (user_id, menu_item_id, quantity) VALUES (?, ?, ?)",
                (session['user_id'], item_id, 1)
            )

        conn.commit()

        cursor.execute("SELECT * FROM order_item WHERE user_id=?", (session['user_id'],))
        cart_items = [dict(row) for row in cursor.fetchall()]
        conn.close()

        return jsonify({
            "message": "Item added to cart",
            "cart": cart_items
        }), 200

    except Exception as e:
        conn.rollback()
        conn.close()
        return jsonify({"error": "Failed to add to cart", "details": str(e)}), 500

# View item
@cart_bp.route('/view_cart', methods=["GET"])
def view_cart():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized please login"}), 401

    conn = cart_db_connection()
  
    cursor = conn.cursor()

    # Join menu_item and order_item
    cursor.execute("""
        SELECT 
            o.id as order_item_id,
            m.id as menu_item_id,
            m.id, 
            m.name, 
            m.image, 
            m.price, 
            o.quantity
        FROM 
            order_item o
        JOIN 
            menu_item m ON o.menu_item_id = m.id
        WHERE 
            o.user_id = ?
    """, (session['user_id'],))

    cart_items = [dict(row) for row in cursor.fetchall()]
    print(cart_items)
    conn.close()
    return jsonify(cart_items)

# remove item
@cart_bp.route('/remove_cart/<int:item_id>',methods=["DELETE"])
def remove_cart(item_id):
    if 'user_id' not in session:
        return jsonify({"error":"Unauthorized please login"}),401
    
    conn = cart_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM order_item WHERE id=? AND user_id=?",(item_id,session['user_id']))
    conn.commit()
    conn.close()

    return jsonify({"message":"item removed from order_item"})


# Decrement
@cart_bp.route('/decrease_cart/<int:item_id>', methods=["POST"])
def decrease_cart(item_id):
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorized please login"}), 401

    conn = cart_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT quantity FROM order_item WHERE user_id=? AND menu_item_id=?", (session['user_id'], item_id))
    row = cursor.fetchone()

    if not row:
        conn.close()
        return jsonify({"message": "item not found"}), 404

    quantity = row['quantity']

    if quantity <= 1:
        cursor.execute("DELETE FROM order_item WHERE user_id=? AND menu_item_id=?", (session['user_id'], item_id))
    else:
        cursor.execute(
            "UPDATE order_item SET quantity = quantity - 1 WHERE user_id=? AND menu_item_id=?",
            (session['user_id'], item_id)
        )

    conn.commit()
    conn.close()

    return jsonify({"message": "item quantity decreased"}), 200

    

@cart_bp.route('/api/check-session')
def check_session():
    return jsonify({
        "loggedin": 'user_id' in session,
        "user_id": session.get('user_id')
    })





