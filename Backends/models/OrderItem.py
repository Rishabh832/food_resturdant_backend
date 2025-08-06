from Backends.models.db import db

class OrderItem(db.Model):
    __tablename__ = 'order_item'

    id = db.Column(db.Integer, primary_key=True)

    
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_item.id'), nullable=False)
    menu_item = db.relationship('MenuItem', backref=db.backref('order_item', lazy=True))

    quantity = db.Column(db.Integer, nullable=False, default=1)
     

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('order_item', lazy=True))


    def __repr__(self):
        return f"<OrderItem {self.menu_item.name} x {self.quantity}>"
