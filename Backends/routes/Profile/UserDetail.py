from flask import Blueprint, session, request, jsonify,current_app
import sqlite3
from datetime import datetime

profile_bp = Blueprint('Profile', __name__, url_prefix='/api/profile')

def profile_db_connection():
    db_path = current_app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@profile_bp.route('/username', methods=["POST"])
def username():
    if 'user_id' not in session:
        return jsonify({"error": "unauthorised please login"})
    
    user_id = session['user_id']
    data = request.get_json()

    full_name = data['full_name']
    email = data['email']
    phone = data['phone']
    address = data['address']
    profile_image = data['profile_image']

    try:
        conn = profile_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO user_detail (user_id, full_name, email, phone, address, profile_image,created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (user_id, full_name, email, phone, address, profile_image,datetime.now()))
        conn.commit()
        conn.close()
        return jsonify({"message": "Profile updated successfully"})
    except Exception as e:
        return jsonify({"error": "Profile updation failed", "detailes": str(e)})
    
@profile_bp.route('/profile_edit',methods=["PUT"])
def edit():
    if 'user_id' not in session:
        return jsonify({"error": "unauthorised please login"})
    
    user_id = session['user_id']
    data = request.get_json()

    full_name = data['full_name']
    email = data['email']
    phone = data['phone']
    address = data['address']
    profile_image = data['profile_image']


    try:
        conn = profile_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("UPDATE user_detail SET full_name=?,email=?,phone=?,address=?,profile_image=? WHERE user_id = ?",(full_name,email,phone,address,profile_image,user_id))
        conn.commit()
        conn.close()
        return jsonify({"message": "Profile updated successfully"})
    except Exception as e:
        return jsonify({"error": "Profile updation failed", "detailes": str(e)})
    

@profile_bp.route('/user_profile',methods=["GET"])
def UserProfile():
    if 'user_id' not in session:
        return jsonify({"error":"Unauthorise please login"})
    
    user_id = session['user_id']
    conn = profile_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT* FROM user_detail WHERE user_id=?",(user_id,))
    row =cursor.fetchone()
    conn.close()
    if row:
        return jsonify(dict(row))
    else:
        return jsonify({"error":"Profile not found"})



