import sys
import os
import pytest
import uuid

# ✅ Add project root to sys.path so imports work
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))


from Backends.app import create_app


@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    app.config["SECRET_KEY"] = "test-secret"
    with app.test_client() as client:
        yield client


def test_login_success(client):
    response = client.post('/api/login', json={
        "username": "rishabh",
        "password": "12"
    })
    assert response.status_code == 200
    assert response.get_json()["message"] == "Login successful"


def test_login_failure(client):
    response = client.post('/api/login', json={
        "username": "wronguser",
        "password": "wrongpass"
    })
    assert response.status_code == 401
    assert response.get_json()["error"] == "Invalid credentials"

# def test_logout_without_login(client):
#     response = client.post('/api/logout')
#     assert response.status_code == 409
#     assert response.get_json()["error"] == "No user is currently logged in"

def test_logout_success(client):
    client.post('/api/logout',json={
        "username":"",
        "password":""
    })
    response = client.post('/api/logout')
    assert response.status_code ==200
    assert response.get_json()["message"] == "logged out successful"



def test_signup_success(client):
    username = f"user_{uuid.uuid4().hex[:6]}"
    response = client.post('/api/signup',json={
        "username":username,
        "password":"1234"
    })
    assert response.status_code == 201
    assert response.get_json()["message"] == "Signup successful"



