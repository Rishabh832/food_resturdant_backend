# import sys
# import os
# import pytest

# sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

# from Backends.models.OrderItem import OrderItem
# from Backends.models.MenuItem import MenuItem
# from Backends.models.User import User
# from Backends.models.db import db
# from Backends.app import app as flask_app  


# @pytest.fixture
# def app():
#     flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
#     flask_app.config['TESTING'] = True

#     with flask_app.app_context():
#         db.create_all()
#         yield flask_app
#         db.session.remove()
#         db.drop_all()


# def test_order_item_repr(app):
#     with app.app_context():
#         user = User(username="rishabh", password="12")
#         db.session.add(user)

#         item = MenuItem(
#             name="Onigiri",
#             description="Samurai snack",
#             image="https://example.com/onigiri.jpg",
#             price=10.0,
#             category="Snacks"
#         )
#         db.session.add(item)
#         db.session.commit()

#         order = OrderItem(menu_item_id=item.id, user_id=user.id, quantity=3)
#         db.session.add(order)
#         db.session.commit()

#         assert str(order) == f"<OrderItem {item.name} x {order.quantity}>"
