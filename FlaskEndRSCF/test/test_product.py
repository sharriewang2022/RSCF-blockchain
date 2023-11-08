import pytest
from api import product

@pytest.mark.parametrize("productId", [
    ("d72c920f-7578-11ee-a0d4-a402b97fc582"),
    (20),
    (''),
])

def test_getSomeProduct(productId):
    assert product.getSomeProduct(productId)  

def test_transactions(my_wallet, earned, spent, expected):
    my_wallet.add_cash(earned)
    my_wallet.spend_cash(spent)
    assert my_wallet.balance == expected

def test_getSomeProduct(productId):
    assert product.getSomeProduct("d72c920f-7578-11ee-a0d4-a402b97fc582")  

def test_getAllProducts():
    assert product.getAllProducts()  

def test_addProduct():
    assert product.addProduct()  