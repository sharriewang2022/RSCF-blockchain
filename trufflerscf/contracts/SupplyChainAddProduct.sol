//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract SupplyChainAddProduct{

    string[] public manufacturer_id=["m1","m2","m3"];
    uint public status;
    string private value1;
    string private value2;
    string private value3;

    function getValue1() public view returns(string memory){
      return value1;
    }
    function getValue2() public view  returns(string memory){
      return value2;
    }
    function getValue3() public view returns(string memory){
      return value3;
    }

    struct product {
      string brand;
      string product_Id;
      string manufacturer_Id;
      string manufactuerName;
      string manufactuerLocation;
      string serial_No;
      string retailer_Id;
    }
     
    struct retailerstructure {
        string name;
        string phno;
        string location;
        string retailer_Id;
    }

    struct customerstructure{
       string name;
       string customerUid;
       string location;
       string serialNo;
    }

    //at testing assign something to it 
    mapping(string  => string[])CustomerUid_SerialNo;

    //reporting stolen,getting details of customer
    mapping(string => retailerstructure)RetailerId_RetailerStruct;

    //mapping of productid with serial number. initailized when a product is created
    mapping(string => string[]) productId_serialNo;

    //serial no to product structure
    mapping(string => product)serialNo_productstructure;

    //so the cycle goes like product_id->serial_no->product_structure
    bool public flag = false;
    string public isManufacturerVeryfied;
    function manufacturerOutput() public view returns(string memory){
        return isManufacturerVeryfied;
    }

    function VerifyManufacturer(string memory _manufacturerId) public
    {
        uint i;
        for(i=0;i<3;i++)
          {
            flag =compareStrings(_manufacturerId,manufacturer_id[i]);
            if(flag==true) break;
          }
        if(flag==true)
            isManufacturerVeryfied = "Manufacturer verified successfully";
        else
            isManufacturerVeryfied = "Manufacturer Id is invalid,Please enter correct Manufacturer Id";
          
    }
      
    string public productOutput;
    function proOutput() public view returns(string memory){
      return productOutput;
    }

    bool public proFlag = false;
    function createProduct(string memory _brand, string memory _product_Id, uint _status,string memory _manufacuterId, string memory _manufactuerName, string  memory _manufactuerLocation,string memory _serialNo,string memory _retailerId) public  {
        product memory newCode;
        newCode.brand = _brand;
        newCode.product_Id = _product_Id;
        status = _status;
        newCode.manufacturer_Id=_manufacuterId;
        newCode.manufactuerName = _manufactuerName;
        newCode.manufactuerLocation = _manufactuerLocation;
        newCode.retailer_Id = _retailerId;
        if(flag==true)
        {
          serialNo_productstructure[_serialNo]=newCode;
          productId_serialNo[_product_Id].push(_serialNo);
          productOutput = "Product Added Successfully";
          proFlag = true;
        }
        else{
          productOutput ="Wrong manufacturer, Product is not Added";
        }  
    }

    string public retailerOutput;
    function retOutput() public view returns(string memory){
      return retailerOutput;
    }
    
    function createRetailer(string memory _name,string memory _phno,string memory _location,string memory _retailerId) public{
        retailerstructure memory retailerObject;
        status = 1;
        retailerObject.name=_name;
        retailerObject.phno=_phno;
        retailerObject.location=_location;
        retailerObject.retailer_Id = _retailerId;
        RetailerId_RetailerStruct[_retailerId] = retailerObject;
        if(proFlag==true)
           retailerOutput ="Retailer Added Successfully";
        else
           retailerOutput = "Retailer can't added";
    }
     string public customerOutput;
     function custOutput() public view returns(string memory){
         return customerOutput;
     }
    function create_customer(string memory _name,string memory _id,string memory _location,string memory _serialNo) public {
           customerstructure memory cust;
           status = 2;
           cust.name=_name;
           cust.customerUid=_id;
           cust.location=_location;
           cust.serialNo=_serialNo;
           CustomerUid_SerialNo[_id].push(_serialNo);
           if(proFlag==true)
           customerOutput ="Customer Added Successfully";
           else
           customerOutput = "Customer can't added";
        }
    
    function check_fake (string memory product_Id,string memory serial_No) public 
       {
          bool checkFlag = false;
          uint idx;
          uint len;
          len= productId_serialNo[product_Id].length;
          for(idx=0;idx<len;idx++)
          {
                 string memory a=productId_serialNo[product_Id][0];
                 string memory b=serial_No;
                 if(compareStrings(a, b)==true)
                   {
                    checkFlag=true;
                    if(status==0)
                      {   
                       value1 =serialNo_productstructure[serial_No].manufacturer_Id;
                       value2 =serialNo_productstructure[serial_No].manufactuerLocation;
                       value3 =serialNo_productstructure[serial_No].manufactuerName;
                
                      }
                    else if(status==1)
                      {
                        string memory temp=serialNo_productstructure[serial_No].retailer_Id;
                        value1= RetailerId_RetailerStruct[temp].name;
                        value2 = RetailerId_RetailerStruct[temp].phno;
                        value3= RetailerId_RetailerStruct[temp].location;
                        
                      }
                     else if(status==2)
                        {   
                          value1 = "It is with";
                          value2 = "some";
                          value3 = "cutomer..";
                        }
                   }
                   
                }  
                if(checkFlag==false){
                    value1 = "its a";
                    value2 = "fake";
                    value3 = "no product as such made";
                }
          }

          function compareStrings(string memory a, string  memory b) public pure returns (bool) {
                bytes memory a1=bytes(a);
                bytes memory b2=bytes(b);
                return keccak256((a1)) == keccak256((b2));
            }         
}
