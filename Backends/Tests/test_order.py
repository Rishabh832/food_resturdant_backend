import os
import sys
import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))
from Backends.app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    return app.test_client()



def test_place_order_success(client):
    # 1. Login as user
    response = client.post('/api/login', json={
        "username": "rishabh",
        "password": "12"
    })
    assert response.status_code == 200

    

    # 2. Ensure profile exists
    response = client.put('/api/profile/profile_edit', json={
        "full_name": "Zoro",
        "email": "zoro@example.com",
        "phone": "1234567890",
        "address": "Wano",
        "profile_image": "https://zoro.com/profile.png"
    })
    assert response.status_code == 200

    # 3. Add menu item
    response = client.post('/api/menu/add', json={
        "name": "Sushi",
        "description": "Fish roll",
        "image": "https://example.com/sushi.jpg",
        "price": "15",
        "category": "Food"
    })
    assert response.status_code in [200, 201]

    # 4. Add to cart (assuming ID = 1 or 2)
    response = client.post('/api/cart/add_cart', json={"item_id": 2})
    assert response.status_code in [200, 201]

    # 5. Place order
    response = client.post('/api/order/placed')
    assert response.status_code == 201
    assert response.get_json()["message"] == "Order placed successfully!"




def test_get_order(client):
    # Login
    response = client.post('/api/login', json={
        "username": "rishabh",
        "password": "12"
    })
    assert response.status_code == 200

    # Get order success details
    response = client.get('/api/order/order_success')
    assert response.status_code == 200

    data = response.get_json()
    assert isinstance(data, dict)
    assert "orders" in data
    assert isinstance(data["orders"], list)

    if data["orders"]:
        assert "item_id" in data["orders"][0]
        assert "item_details" in data["orders"][0]




def test_cancel_order(client):
    # Login
    response = client.post('/api/login', json={
        "username": "rishabh",
        "password": "12"
    })
    assert response.status_code == 200

    # Get order success details
    response = client.delete('/api/order/order_delete/3')
    assert response.status_code == 200
    assert response.get_json()["message"] == "Order cancel successfully"



# pytest Backends/Tests/test_order.py -v