from flask import Blueprint,jsonify,request,current_app
import sqlite3


menu_bp = Blueprint('menu',__name__,url_prefix='/api/menu')

def menu_db_connection():
    db_path = current_app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', '')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@menu_bp.route('/',methods=["GET"])
def get_menu():
    conn = menu_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT* FROM menu_item")
    items = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return jsonify(items)

# Post new menu item

@menu_bp.route('/add',methods=["POST"])
def add_menu():
    data = request.get_json()
    name = data['name']
    description = data['description']
    image = data['image']
    price = data['price']
    category = data['category']

    conn = menu_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO menu_item (name,description,image,price,category)VALUES(?,?,?,?,?)",(name,description,image,price,category))
        conn.commit()
        conn.close()
        return jsonify({"message":"item added to menu"})
    except Exception as e:
        return jsonify({"error":"item is not added failed","details":str(e)})

# remove item in menu

@menu_bp.route('/remove/<int:item_id>',methods=["DELETE"])
def remove_menu(item_id):
    conn = menu_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM menu_item WHERE id = ?",(item_id,))
    conn.commit()
    conn.close()

    return jsonify({"message":"item deleted"})


#  PUT - Update Menu Item
@menu_bp.route('/update/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    data = request.get_json()
    name = data['name']
    description = data['description']
    image = data['image']
    price = data['price']
    category = data['category']

    conn = menu_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE menu_item SET name=?, description=?, image=?, price=?,category=? WHERE id=?", (name,description,image, price, item_id,category))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Item updated'})