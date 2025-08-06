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

def test_add_to_cart_success(client):
    
    response = client.post('/api/login', json={
        "username": "rishabh",
        "password": "12"
    })
    assert response.status_code == 200

    # Add item to cart (use valid item_id from your DB)
    response = client.post('/api/cart/add_cart', json={
        "item_id": 3
    })
    assert response.status_code == 200
    json_data = response.get_json()
    assert "message" in json_data
    assert json_data["message"] == "Item added to cart"
    assert isinstance(json_data["cart"], list)

def test_view_cart(client):
    response = client.post('/api/login', json={
    "username": "rishabh",
    "password": "12"
    })
    assert response.status_code == 200

    response = client.get('api/cart/view_cart')
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)


def test_remove_cart(client):
    response = client.post('/api/login', json={
    "username": "rishabh",
    "password": "12"
    })
    assert response.status_code == 200

    response = client.delete('api/cart/remove_cart/7')
    assert response.status_code == 200
    assert response.get_json()["message"] == "item removed from order_item"



def test_decrement_cart(client):
    response = client.post('/api/login', json={
    "username": "rishabh",
    "password": "12"
    })
    assert response.status_code == 200

    response = client.post('api/cart/decrease_cart/3')
    assert response.status_code == 200
    assert response.get_json()["message"] == "item quantity decreased"