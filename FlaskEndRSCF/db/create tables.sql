CREATE TABLE User(
  ID Int(30) NOT NULL AUTO_INCREMENT,
  UserID Varchar(30) NOT NULL,
  UserName Varchar(30) NOT NULL,
  UserPassword Varchar(255) NOT NULL,
  FirstName Varchar(30) NOT NULL,
  LastName Varchar(30) NOT NULL,
  RoleID Varchar(30) NOT NULL,
  Email Varchar(50) DEFAULT NULL,
  Telephone Int(30) NOT NULL,
  CreateDate date DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY Telephone (Telephone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE Role(
  ID Int(30) NOT NULL AUTO_INCREMENT,
  RoleID Varchar(30) NOT NULL,
  RoleName Varchar(50) NOT NULL,
  Description Varchar(100) NOT NULL,   
  CreateDate date DEFAULT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 
CREATE TABLE Menu(
  ID Int(30) NOT NULL AUTO_INCREMENT,
  MenuID Varchar(30) NOT NULL,
  MenuName Varchar(50) NOT NULL,
  Description Varchar(100) NOT NULL,   
  CreateDate date DEFAULT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE Role_Permission(
  ID Int(30) NOT NULL AUTO_INCREMENT,
  RoleID Varchar(30) NOT NULL,
  MenuID Varchar(30) NOT NULL,
  Permission Varchar(30) NOT NULL,   
  CreateDate date DEFAULT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE Product(
  ID Int(30) NOT NULL AUTO_INCREMENT,
  ProductID Varchar(50) NOT NULL,
  ProductName Varchar(50) NOT NULL,
  ProductNumber Varchar(50) NOT NULL,
  ProductPrice Varchar(30) NOT NULL,
  ProductItems Varchar(50) NOT NULL,
  BlockchainHash Varchar(2000) NULL,
  CategoryID Varchar(50) NOT NULL,
  SupplierID Varchar(50) DEFAULT NULL,
  ManufacturerID Varchar(50) NOT NULL,
  Description Varchar(50) NOT NULL,   
  CreateDate date DEFAULT NULL,
  PRIMARY KEY (ID) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE Category(
  ID Int(30) NOT NULL AUTO_INCREMENT,
  CategoryID Varchar(50) NOT NULL,
  CategoryName Varchar(50) NOT NULL,
  ParentID Varchar(50) NOT NULL,   
  SupplierID Varchar(50) DEFAULT NULL,
  ManufacturerID Varchar(50) NOT NULL,
  Description Varchar(30) NOT NULL,   
  CreateDate date DEFAULT NULL,
  PRIMARY KEY (ID) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE OrderProduct(
  ID Int(30) NOT NULL AUTO_INCREMENT,
  OrderID Varchar(50) NOT NULL,
  OrderName Varchar(50) NOT NULL,
  OrderNumber Varchar(50) NOT NULL,
  OrderType Varchar(30) NOT NULL,
  OrderStatus Varchar(50) NOT NULL,  
  ProductID Varchar(50) NOT NULL,
  UserID Varchar(50) DEFAULT NULL,
  Quantity Int(30) NOT NULL,
  UnitPrice Number(30) NOT NULL,
  BlockchainHash Varchar(2000) NULL,
  Description Varchar(50) NOT NULL,   
  CreateDate date DEFAULT NULL,
  PRIMARY KEY (ID) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE Document(
  ID Int(30) NOT NULL AUTO_INCREMENT,
  DocumentID Varchar(50) NOT NULL,
  DocumentName Varchar(50) NOT NULL,
  ExtensionName Varchar(10) NOT NULL,
  RealPath Varchar(200) NOT NULL,
  AuthorID Varchar(50) NOT NULL,  
  BlockchainHash Varchar(2000) NULL,
  Description Varchar(50) NOT NULL,   
  CreateDate date DEFAULT NULL,
  PRIMARY KEY (ID) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;