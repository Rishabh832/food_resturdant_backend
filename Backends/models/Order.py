from Backends.models.db import db
from datetime import datetime


class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'))  


    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    is_placed = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(50), default='pending')  

    order_id = db.Column(db.String(50), nullable=False)
    item_id = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer,nullable = False)


    def __repr__(self):
        return f"<Order #{self.id} by {self.customer_name}>"

    def total_price(self):
        return sum(item.price * item.quantity for item in self.items)
