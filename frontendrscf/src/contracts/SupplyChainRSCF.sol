// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SupplyChainRSCF {

    //utility functions
    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function append(string memory a, string memory b, string memory c, string memory d, string memory e, string memory f) internal pure returns (string memory) {
        return string(abi.encodePacked(a, ',', b, ',', c, ',', d, ',', e, ',', f));
    }

    uint256 public productCount =0;
   
    //mapping: key--value
    mapping(string => Product) public ProductMap;
    mapping(string => bool) public productAdded;
    Product[] public Products;
    //store all locations
    mapping(string => string[]) productId_locations;

    struct Product {
        string productId;
        address owner;
        string productName;
        string manufacturer;
        string supplier;
        string currentLocation;
        uint256 date;
    }

    //following is events
    event ProductAdded( 
        string productId,
        address owner,
        string productName,
        string manufacturer,
        string supplier,
        string currentLocation,
        uint256 date
    );

    event locationChanged(string productId, string currentLocation);

    event Info(string info);

    //following is modifiers
    modifier owner_only(string memory _productId){
        require(msg.sender == ProductMap[_productId].owner);
        _;
    }

    string public productOutput;
    function proOutput() public view returns(string memory){
      return productOutput;
    }

    //main methods
    function addProduct(string memory _productId, string memory _productName, 
        string memory _manufacturer, string memory _supplier, 
        string memory _currentLocation)  public returns (bool){

        require(bytes(_productName).length > 0);
        productCount++;
        Product memory newProduct;
        newProduct.productId= _productId;
        newProduct.owner = msg.sender;
        newProduct.productName = _productName;
        newProduct.supplier = _supplier;
        newProduct.manufacturer = _manufacturer;
        newProduct.currentLocation = _currentLocation;
        newProduct.date = block.timestamp;
        productAdded[_productId] = true;       
        ProductMap[_productId] = newProduct;
        Products.push(newProduct);
        productId_locations[_productId].push(_currentLocation);
        productOutput = "Product Added Successfully";        
        emit ProductAdded(_productId, msg.sender, _productName, _manufacturer, _supplier, _currentLocation, block.timestamp);
        return true;
    }
 

    function getProducts() public view returns (Product[] memory) {
        return Products;
    }

    function changeLocation(string memory _location , string memory _productId, address _new_owner) public owner_only(_productId){

        //  Product storage _product = Products[_id];
         Product storage _product = ProductMap[_productId];
        require(productAdded[_productId] == true, "This product does not exist");
         _product.owner = _new_owner; 
         emit locationChanged(_productId, _location);
    }

    function fetchProductInfo(string memory _productId)public view returns(string memory) {

        string memory _info  = append(
            _productId,
            ProductMap[_productId].productName,
            ProductMap[_productId].manufacturer,
            ProductMap[_productId].supplier,
            ProductMap[_productId].currentLocation,
            uint2str(ProductMap[_productId].date));
        return _info;
    }

     function fetchAddress(string memory _producId) public view returns (address){        
        address str = ProductMap[_producId].owner;
        return str;
    }

    function fetchAllLocation(string memory _producId) public view returns (string[15] memory){
        // string memory currLocation = ProductMap[_producId].currentLocation;
        string[15] memory allLocations;
        for( uint i = 0; i <= productId_locations[_producId].length; i++){
            allLocations[i] = productId_locations[_producId][i];
        }
        return allLocations;
    }

    function compareStringValue(string memory s1, string  memory s2) public pure returns (bool) {
        bytes memory a1=bytes(s1);
        bytes memory b2=bytes(s2);
        return keccak256((a1)) == keccak256((b2));
    }      
}