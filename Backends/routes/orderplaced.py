from flask import Flask, Blueprint, session, request, jsonify
import sqlite3
from datetime import datetime
import secrets

order_bp = Blueprint('order', __name__, url_prefix='/api/order')

def order_db_connection():
    conn = sqlite3.connect('instance/database.db')
    conn.row_factory = sqlite3.Row
    return conn

@order_bp.route('/placed', methods=["POST"])
def placed():
    if 'user_id' not in session:
        return jsonify({"error": "Unauthorised. Please login."}), 401

    user_id = session['user_id']
    conn = order_db_connection()
    cursor = conn.cursor()

    #  Check if profile is complete
    cursor.execute("SELECT full_name, address, phone FROM user_detail WHERE user_id = ?", (user_id,))
    user = cursor.fetchone()

    if not user or not user['full_name'] or not user['address'] or not user['phone']:
        conn.close()
        return jsonify({'error': 'Please complete your profile before placing an order.'}), 400

    #  Get cart items
    cursor.execute("SELECT * FROM order_item WHERE user_id = ?", (user_id,))
    cart_items = cursor.fetchall()

    if not cart_items:
        conn.close()
        return jsonify({'error': 'Cart is empty'}), 400

    try:
        order_date = datetime.now()
        is_placed = True
        status = "confirm"

        for item in cart_items:
            order_id = "ORD-" + secrets.token_hex(4).upper()  
            cursor.execute("""
                INSERT INTO orders (customer_id, order_id, item_id, quantity, order_date, is_placed, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                user_id,
                order_id,
                item['menu_item_id'],
                item['quantity'],
                order_date,
                is_placed,
                status
            ))

        cursor.execute("DELETE FROM order_item WHERE user_id = ?", (user_id,))
        conn.commit()

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

    return jsonify({'message': 'Order placed successfully!'}), 201


# Get order place
@order_bp.route('/order_success', methods=["GET"])
def orderSuccess():
    if 'user_id' not in session:
        return jsonify({'error': "Unauthorized, please login"}), 401

    user_id = session['user_id']
    conn = order_db_connection()
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    try:
        #  Fetch all orders of this user
        cursor.execute('SELECT * FROM orders WHERE customer_id = ?', (user_id,))
        order_data = cursor.fetchall()

        if not order_data:
            return jsonify({'error': 'No order placed!'}), 404

        item_ids = [row['item_id'] for row in order_data]

        # Fetch user details
        cursor.execute('SELECT * FROM user_detail WHERE user_id = ?', (user_id,))
        user_details = cursor.fetchone()

        if not user_details:
            return jsonify({'message': 'Update profile first'}), 400

        #  Fetch item details (menu_item)
        if item_ids:
            placeholders = ','.join(['?'] * len(item_ids))
            query = f'SELECT * FROM menu_item WHERE id IN ({placeholders})'
            cursor.execute(query, item_ids)
            item_details = cursor.fetchall()
            items_dict = {item['id']: dict(item) for item in item_details}
        else:
            items_dict = {}

        # Build response
        order_details_dict = dict(user_details)
        orders_list = []
        for order in order_data:
            order_dict = dict(order)
            order_dict['item_details'] = items_dict.get(order['item_id'], {})
            orders_list.append(order_dict)

        order_details_dict['orders'] = orders_list


        return jsonify(
            order_details_dict
        ), 200

    except Exception as e:
        print("Error in /order_success:", e)
        return jsonify({"error": "Internal server error"}), 500

    finally:
        conn.close()


# Cancel order
@order_bp.route('/order_delete/<int:order_id>',methods=["DELETE"])
def order_delete(order_id):
    # Check user login
    if 'user_id' not in session:
        return jsonify({'error':"Unauthorised please login"})
    
    user_id = session['user_id']
    conn = order_db_connection()
    cursor = conn.cursor()

    #  cancel specific order
    cursor.execute("DELETE FROM orders WHERE customer_id=? AND id=?",(user_id,order_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message":"Order cancel successfully"})



        