from flask import Flask, jsonify, request, Blueprint
from util.mySqlDB import mySqlDB
from util.redisUtil import redisUtil
from datetime import datetime
import uuid

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
ProductBP = Blueprint("ProductBP", __name__)

@ProductBP.route("/product/allProducts", methods=["GET"])
def getAllProducts():
    """all product info"""
    sql = "SELECT * FROM product"
    data = mySqlDB.selectMysqldb(sql)
    print("all products' data == >> {}".format(data))
    return jsonify({"code": 0, "data": data, "msg": "success"})


@ProductBP.route("/product/getSomeProduct/<string:productId>", methods=["GET"])
def getSomeProduct(productId):
    """some product"""
    sql = "SELECT * FROM product WHERE productId = '{}'".format(productId)
    data = mySqlDB.selectMysqldb(sql)
    print("gain {} product info == >> {}".format(productId, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "success"})
    return jsonify({"code": "1004", "msg": "no product"})


@ProductBP.route("/product/addProduct", methods=['POST'])
def addProduct():
    """add product"""
    productId = uuid.uuid1()
    productName = request.json.get("productName", "").strip()  
    productNumber = request.json.get("productNumber", "").strip()
    productPrice = request.json.get("productPrice", "").strip()
    productItems = request.json.get("productItems", "").strip()
    categoryID = request.json.get("categoryID", "").strip() 
    supplierID = request.json.get("supplierID", "").strip()
    manufacturerID = request.json.get("manufacturerID", "").strip()
    description = request.json.get("description", "").strip()
    # blockchainHash = request.json.get("blockchainHash", "").strip()
    blockchainHash = "undefined"
    # createDate = datetime.now().date
    # createDate = datetime.date.today()
    createDate = datetime.today().date()
    print("Add product createDate ==>> {}".format(createDate))
    

    if productName : # if "", the false
        queryProductNameSql = "SELECT productName FROM product WHERE productname = '{}'".format(productName)
        isProductExist = mySqlDB.selectMysqldb(queryProductNameSql)
        print("Querey product result ==>> {}".format(isProductExist))
  
        if isProductExist:
            print("The product name already exists！ name: ==>> {}".format(productName))
            return jsonify({"code": 1001, "msg": "The product name already exists！"})
        else:
             
            addProductSql = "INSERT INTO product(productId, productName, productNumber, productPrice, "\
                "productItems, categoryID, supplierID, manufacturerID, description, blockchainHash, createDate) "\
                "VALUES('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(
                    productId, productName, productNumber, productPrice, productItems, 
                    categoryID, supplierID, manufacturerID, description, blockchainHash, createDate)
            mySqlDB.executeMysqldb(addProductSql)
            print("Add product SQL ==>> {}".format(addProductSql))
            return jsonify({"code": 200, "msg": "The product is added successfully！"})
    else:
        return jsonify({"code": 1001, "msg": "product name could not be null"})



@ProductBP.route("/product/updateProduct/<int:id>", methods=['PUT'])
def UpdateProduct(id):  
    """update product, only manufacturer could do this"""
    productManufacturer = request.json.get("productManufacturer", "").strip()  
    token = request.json.get("token", "").strip()  
    newProductName = request.json.get("productName", "").strip()  
    newProductNumber = request.json.get("productNumber", "").strip()
    newProductPrice = request.json.get("productPrice", "").strip()
    newProductItems = request.json.get("productItems", "").strip()
    newCategoryID = request.json.get("categoryID", "").strip() 
    newSupplierID = request.json.get("supplierID", "").strip()
    newManufacturerID = request.json.get("manufacturerID", "").strip()
    newDescription = request.json.get("description", "").strip()


    if productManufacturer and token and newProductName and newProductNumber \
        and newProductPrice and newProductItems and newCategoryID and newSupplierID and newManufacturerID:
        # get token from redis
        redisToken = redisUtil.operateRedisToken(productManufacturer) 
        if redisToken:
            if redisToken == token: # redis token ==  request body token
                queryRoleIdSql = "SELECT roleId FROM user WHERE userID = '{}'".format(productManufacturer)
                roleResult = mySqlDB.selectMysqldb(queryRoleIdSql)
                print(" The user {} role is == >> {}".format(productManufacturer, roleResult))
                userRole = roleResult[0]["roleId"]
                # TODO
                if userRole == 8888888: # if usr role is product Manufacturer
                    queryProductByIdSql = "SELECT * FROM product WHERE id = '{}'".format(id)
                    resQueryID = mySqlDB.selectMysqldb(queryProductByIdSql)
                    print("Product {} query info   ==>> {}".format(id, resQueryID))

                    if not resQueryID: # no this product id
                        return jsonify({"code": 5005, "msg": "The product ID does not exist"})                   
            
                    updateProductSql = "UPDATE product SET productName = '{}', productNumber = '{}', productPrice = '{}', "\
                    "productItems = '{}', categoryID = '{}', supplierID = '{}', manufacturerID = '{}', description = '{}' "\
                                "WHERE id = {}".format(newProductName, newProductNumber, newProductPrice, 
                                newProductItems, newCategoryID, newSupplierID, newManufacturerID, newDescription)
                    mySqlDB.executeMysqldb(updateProductSql)
                    print("update product SQL ==>> {}".format(updateProductSql))
                    return jsonify({"code": 0, "msg": "The information of product was changed successfully！"})
                else:
                    return jsonify({"code": 5004, "msg": "Only Manufacturer could update product information"})
            else:
                return jsonify({"code": 5003, "msg": "Token is not right"})
        else:
            return jsonify({"code": 5002, "msg": "Please log in firstly"})
    else:
        return jsonify({"code": 5001, "msg": "The details of product could not be empty"})
    

@ProductBP.route("/product/deleteProduct/<string:id>", methods=['POST'])
def deleteProduct(id):
    adminUser = request.json.get("adminUser", "").strip()  
    token = request.json.get("token", "").strip()  
    if adminUser and token:
        redisToken = redisUtil.operateRedisToken(adminUser) 
        if redisToken:
            if redisToken == token:  #  redis_token  == body token
                queryRoleIdSql = "SELECT roleId FROM user WHERE username = '{}'".format(adminUser)
                roleResult = mySqlDB.selectMysqldb(queryRoleIdSql)
                print("User: {} role  == >> {}".format(adminUser, roleResult))
                userRole = roleResult[0]["roleId"]
                if userRole == 8888888: # if usr role is product Manufacturer
                    queryProductByIdSql = "SELECT * FROM product WHERE id = '{}'".format(id)
                    resQueryID = mySqlDB.selectMysqldb(queryProductByIdSql)
                    print("Product {} query info   ==>> {}".format(id, resQueryID))

                    if not resQueryID: # no this product id
                        return jsonify({"code": 5005, "msg": "The product ID does not exist"})    
                    else:
                        delProductSql = "DELETE FROM product WHERE id = '{}'".format(id)
                        mySqlDB.executeMysqldb(delProductSql)
                        print("Delete product information SQL ==>> {}".format(delProductSql))
                        return jsonify({"code": 0, "msg": "The product is deleted successfully！"})
                else:
                    return jsonify({"code": 5004, "msg": "Only administrator could delete product information"})
            else:
                return jsonify({"code": 5003, "msg": "Token is not right"})
        else:
            return jsonify({"code": 5002, "msg": "Please log in firstly"})
    else:
        return jsonify({"code": 5001, "msg": "Token could not be empty"})