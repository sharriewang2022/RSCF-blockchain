// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
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
    function append(string memory a, string memory b, string memory c) internal pure returns (string memory) {
    return string(abi.encodePacked(a, ',', b, ',', c));
}

   uint256 public productCount =0;
   
   //mapping: key--value
   mapping(uint256 => Product) public ProductMap;
   mapping(uint => bool) public productAdded;
   Product[] public Products;

    struct Product {
        uint256 id;
        address owner;
        string name;
        string manufacturer;
        string supplier;
        uint256 currentLocation;
        uint256 date;
        mapping(uint256 => string) Locations;
    }

    //following is events
    event ProductAdded( 
        uint256 id,
        address owner,
        string name,
        string manufacturer,
        string supplier,
        uint currentLocation,
        uint256 date
    );

    event locationChanged(uint256 id, string currentLocation);

    event Info( string info);

    //following is modifiers
    modifier owner_only(uint _id){
        require(msg.sender == Products[_id].owner);
        _;
    }

    //main methods
    function addProduct(uint256 _id, string memory _name, string memory _manufacturer, string memory _supplier)  public returns (bool){

        require(bytes(_name).length > 0);
        productCount++;
        //TypeError: Types in storage containing (nested) mappings cannot be assigned to
        // Products[productCount] = Product(productCount, msg.sender, _name, 0, block.timestamp);
        Product storage newProduct = ProductMap[productCount];
        newProduct.id= _id;
        newProduct.owner = msg.sender;
        newProduct.name = _name;
        newProduct.supplier = _supplier;
        newProduct.manufacturer = _manufacturer;
        newProduct.currentLocation = 0;
        newProduct.date = block.timestamp;
        newProduct.Locations[productCount] = "0";
        productAdded[productCount] = true;
        emit ProductAdded(_id, msg.sender, _name, _manufacturer, _supplier,0, block.timestamp);
        return true;
    }

    function changeLocation( string memory _location  , uint256 _id, address _new_owner) public owner_only(_id){

        //  Product storage _product = Products[_id];
         Product storage _product = Products[_id];
        require(productAdded[_id] == true, "This product does not exist");
         _product.currentLocation++;
         _product.Locations[_product.currentLocation] = _location;
         _product.owner = _new_owner;
        //  Products[_id] = _product;

         emit locationChanged( _id, _location);

    }

    function fetchInfo( uint256 _id)public view returns(string memory) {

        string memory _info  = append(
            Products[_id].name,
            Products[_id].Locations[Products[_id].currentLocation],
           uint2str(Products[_id].date));
        return _info;
    }

     function fetchAddress( uint _id) public view returns (address){
        
        address str = Products[_id].owner;
        return str;
    }

    function fetchAllLocation( uint _id) public view returns (string[15] memory){
        uint cLocat = Products[_id].currentLocation;
        string[15] memory temp;
        for( uint i = 0 ; i <=cLocat;i++){
            temp[i] = Products[_id].Locations[i];
        }
        return temp;
    }
}