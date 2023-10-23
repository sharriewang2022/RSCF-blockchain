// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProductCRUD {
    struct Product {
        uint productId;
        string productName;
        string productType;
        uint quantity;
        string location;
    }

    mapping (uint => Product) public products;
    uint public productCount;

    function createProduct(string memory _productName, string memory _productType, uint _quantity, string memory _location) public {
        productCount ++;
        products[productCount] = Product(productCount, _productName, _productType, _quantity, _location);
    }

    function getProductById(uint _productId) public view returns (uint, string memory, string memory, uint, string memory) {
        Product memory product = products[_productId];
        return (product.productId, product.productName, product.productType, product.quantity, product.location);
    }
}