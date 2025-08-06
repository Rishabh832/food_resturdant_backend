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


def test_get_user_profile(client):
    login_response = client.post('/api/login', json={
        "username": "rishabh",
        "password": "12"
    })
    assert login_response.status_code == 200
    assert login_response.get_json()["message"] == "Login successful"

    response = client.get('/api/profile/user_profile')
    assert response.status_code == 200
    json_data = response.get_json()
    assert "full_name" in json_data or "error" in json_data


def test_edit_profile(client):
    login_response = client.post('/api/login', json={
        "username": "rishabh",
        "password": "12"
    })
    assert login_response.status_code == 200

    response = client.put('/api/profile/profile_edit', json={
        "full_name": "Zoro",
        "email": "zoro@gmail.com",
        "phone": "08454854",
        "address": "sea",
        "profile_image": "https://easydrawingguides.com/wp-content/uploads/2024/05/how-to-draw-zoro-from-one-piece-featured-image-1200.png"
    })
    assert response.status_code == 200
    assert response.get_json()["message"] == "Profile updated successfully"


def test_add_profile(client):
    login_response = client.post('/api/login', json={
        "username": "charchit",
        "password": "1234"
    })
    assert login_response.status_code == 200

    response = client.post('/api/profile/username', json={
        "full_name": "Zoro",
        "email": "zoro@gmail.com",
        "phone": "08454854",
        "address": "sea",
        "profile_image": "https://easydrawingguides.com/wp-content/uploads/2024/05/how-to-draw-zoro-from-one-piece-featured-image-1200.png"
    })
    assert response.status_code == 200
    assert response.get_json()["message"] == "Profile updated successfully"
