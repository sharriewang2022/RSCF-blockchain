// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ProductSC {
    struct Product {
        uint productId;
        string productName;
        string productType;
        uint quantity;
        string location;
    }

    mapping (uint => Product) public products;
    uint public productCount;

    function createProduct(string _productName, string _productType, uint _quantity, string _location) public {
        productCount ++;
        products[productCount] = Product(productCount, _productName, _productType, _quantity, _location);
    }

    function getProductById(uint _productId) public view returns (uint, string, string, uint, string) {
        Product memory product = products[_productId];
        return (product.productId, product.productName, product.productType, product.quantity, product.location);
    }
}