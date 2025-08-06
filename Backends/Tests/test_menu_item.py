import pytest
from Backends.models.MenuItem import MenuItem

def test_menu_item_valid_data():
    item = MenuItem(
        name="Burger",
        description="A delicious burger",
        image="https://example.com/burger.jpg",
        price=99.0,
        category="Fast Food"
    )
    assert item.name == "Burger"
    assert item.price == 99.0
    assert item.category == "Fast Food"
    assert "Burger" in repr(item)

def test_menu_item_invalid_price():
    with pytest.raises(ValueError) as excinfo:
        MenuItem(
            name="Free Pizza",
            description="Impossible!",
            image="https://example.com/freepizza.jpg",
            price=0.0,
            category="Junk"
        )
    assert "Price must be a positive number." in str(excinfo.value)






# $env:PYTHONPATH = "$PWD"; pytest Backends/Tests/test_menu_item.py
