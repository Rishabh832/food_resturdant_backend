from flask import Blueprint, Flask,redirect,render_template,session,url_for,request,jsonify,make_response,Response
import sqlite3
from flask_cors import CORS
import os


auth_bp = Blueprint('auth',__name__)

def get_db_connection():
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    db_path = os.path.join(BASE_DIR, 'Backends', 'instance', 'database.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@auth_bp.route('/api/signup',methods=["POST"])
def signup():
        data = request.get_json()
        username = data['username']
        password = data['password']

        conn = get_db_connection()
        cursor = conn.cursor()

 
        cursor.execute("SELECT * FROM user WHERE username = ?", (username,))
        existing_user = cursor.fetchone()

        if existing_user:
            conn.close()
            return jsonify({"error": "Username already exists"}), 409
        try:
            cursor.execute("INSERT INTO user (username,password)VALUES(?,?)",(username,password))
            conn.commit()
            conn.close()
            return jsonify({"message": "Signup successful"}), 201
        except Exception as e:
           print("Signup Error:", e)
           return jsonify({"error": "Signup failed", "details": str(e)}), 500

@auth_bp.route('/api/login',methods=["POST"])
def login():
        data = request.get_json()
        username = data['username']
        password = data['password']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT* FROM user WHERE username=? AND password=?",(username,password))
        user = cursor.fetchone()
        conn.close()

        if user:
            session.clear()
            session['user_id'] = user['id']
            session['username'] = user['username']
            return jsonify({"message":"Login successful","username":username}),200
        else:
            return jsonify({"error":'Invalid credentials'}),401


@auth_bp.route('/api/logout',methods=["POST"])
def logout():
    session.pop('username',None)
    session.pop('user_id', None)
    session.clear()
    return jsonify({"message":"logged out successful"}),200
    

@auth_bp.route('/api/check-session',methods=["GET"])
def check_session():
     if 'username' in session and 'user_id' in session:
          return jsonify({'loggedin':True,'username':session['username']}),200
     return jsonify({"loggedin":False}),200


