import sys
import os
import pytest

# ✅ Add project root to sys.path so imports work
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from Backends.app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

# ✅ Actual test function
def test_get_menu_items(client):
    response = client.get("/api/menu/")
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)

def test_add_menu_items(client):
    response = client.post("api/menu/add", json={
        "name":"orange",
        "description":"orange",
        "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/1200px-Ambersweet_oranges.jpg",
        "price":"70",
        "category":"Fruit"
    })
    assert response.status_code == 200
    assert response.get_json()["message"] == "item added to menu"

def test_remove_menu(client):
    response = client.delete("api/menu/remove/1")
    assert response.status_code == 200
    assert response.get_json()["message"] == "item deleted"


def test_update_menu_items(client):
    response = client.put("api/menu/update/1", json={
        "name":"orange",
        "description":"orange",
        "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Ambersweet_oranges.jpg/1200px-Ambersweet_oranges.jpg",
        "price":"70",
        "category":"Fruit"
    })
    assert response.status_code == 200
    assert response.get_json()["message"] == "Item updated"