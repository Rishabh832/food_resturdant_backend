from Backends.models.db import db
from sqlalchemy.orm import validates


class MenuItem(db.Model):
    __tablename__ = 'menu_item'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(150), nullable=False)
    price = db.Column(db.Float, nullable=False)  
    category = db.Column(db.String(50), nullable=False)

    @validates('price')
    def validate_price(self, key, value):
        if value <= 0:
            raise ValueError("Price must be a positive number.")
        return value

    def __repr__(self):
        return f"<MenuItem {self.name} - ₹{self.price}>"
