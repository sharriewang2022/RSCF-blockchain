from flask import Flask, jsonify, request, Blueprint
from util.mySqlDB import mySqlDB
from util.redisUtil import redisUtil

from datetime import datetime
import uuid

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
OrderBP = Blueprint("OrderBP", __name__)


@OrderBP.route("/order/allOrders", methods=["GET"])
def getAllOrders():
    """all order info"""
    sql = "SELECT * FROM orderProduct"
    data = mySqlDB.selectMysqldb(sql)
    print("all orders' data == >> {}".format(data))
    return jsonify({"code": 0, "data": data, "msg": "success"})


@OrderBP.route("/order/getSomeOrder/<string:orderId>", methods=["GET"])
def getSomeOrder(orderId):
    """some order"""
    sql = "SELECT * FROM orderProduct WHERE orderId = '{}'".format(orderId)
    data = mySqlDB.selectMysqldb(sql)
    print("gain {} order info == >> {}".format(orderId, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "success"})
    return jsonify({"code": "7007", "msg": "no order"})


@OrderBP.route("/order/addOrder", methods=['POST'])
def addOrder():
    """add order"""
    orderId = uuid.uuid1()
   
    orderName = request.json.get("orderName", "").strip()  
    orderNumber = request.json.get("orderNumber", "").strip()
    OrderType = request.json.get("orderType", "").strip()
    OrderStatus = request.json.get("orderStatus", "").strip()
    ProductID = request.json.get("productID", "").strip() 
    UserID = request.json.get("userID", "").strip()
    Quantity = request.json.get("quantity", "").strip()
    UnitPrice = request.json.get("unitPrice", "").strip()
    description = request.json.get("description", "").strip()
    blockchainHash = request.json.get("blockchainHash", "").strip()
    createDate = datetime.now().date

    if orderName : # if "", the false
        queryOrderNameSql = "SELECT orderName FROM orderProduct WHERE ordername = '{}'".format(orderName)
        isOrderExist = mySqlDB.selectMysqldb(queryOrderNameSql)
        print("Querey order result ==>> {}".format(isOrderExist))
  
        if isOrderExist:
            return jsonify({"code": 7001, "msg": "The order name already exists！"})
        else:           
            addOrderSql = "INSERT INTO orderProduct(orderId, orderName, OrderNumber, OrderType, OrderStatus, ProductID, "\
                "UserID, Quantity, UnitPrice, BlockchainHash, Description, CreateDate) "\
                "VALUES('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}, '{}', '{}')".format(orderId, orderName, orderNumber, OrderType,
                    OrderStatus, ProductID, UserID, Quantity, UnitPrice, blockchainHash, description, createDate)
            mySqlDB.executeMysqldb(addOrderSql)
            print("Add order SQL ==>> {}".format(addOrderSql))
            return jsonify({"code": 0, "msg": "The order is added successfully！"})
    else:
        return jsonify({"code": 7001, "msg": "order name could not be null"})



@OrderBP.route("/order/updateOrder/<int:id>", methods=['PUT'])
def UpdateOrder(id):  
    """update order, only manufacturer could do this"""
    orderManufacturer = request.json.get("orderManufacturer", "").strip()  
    token = request.json.get("token", "").strip()  
    newOrderName = request.json.get("orderName", "").strip()  
    newOrderNumber = request.json.get("orderNumber", "").strip()
    newOrderType = request.json.get("orderType", "").strip()
    newOrderStatus = request.json.get("orderStatus", "").strip()
    newProductID = request.json.get("productID", "").strip() 
    newUserID = request.json.get("userID", "").strip()
    newQuantity = request.json.get("quantity", "").strip()
    newUnitPrice = request.json.get("unitPrice", "").strip()
    newBlockchainHash = request.json.get("blockchainHash", "").strip()
    newDescription = request.json.get("description", "").strip()


    if orderManufacturer and token and newOrderName and newOrderNumber and newOrderType\
        and newOrderStatus and newProductID and newUserID and newQuantity and newUnitPrice:
        # get token from redis
        redisToken = redisUtil.operateRedisToken(orderManufacturer) 
        if redisToken:
            if redisToken == token: # redis token ==  request body token
                queryRoleIdSql = "SELECT roleId FROM user WHERE userID = '{}'".format(orderManufacturer)
                roleResult = mySqlDB.selectMysqldb(queryRoleIdSql)
                print(" The user {} role is == >> {}".format(orderManufacturer, roleResult))
                userRole = roleResult[0]["roleId"]
                # TODO
                if userRole == 8888888: # if usr role is order Manufacturer
                    queryOrderByIdSql = "SELECT * FROM orderProduct WHERE id = '{}'".format(id)
                    resQueryID = mySqlDB.selectMysqldb(queryOrderByIdSql)
                    print("Order {} query info   ==>> {}".format(id, resQueryID))

                    if not resQueryID: # no this order id
                        return jsonify({"code": 7005, "msg": "The order ID does not exist"})             
            
                    updateOrderSql = "UPDATE orderProduct SET orderName = '{}', orderNumber = '{}', OrderType = '{}', "\
                    "OrderStatus = '{}', ProductID = '{}', UserID = '{}', Quantity = '{}', UnitPrice = '{}', description = '{}' "\
                                "WHERE id = {}".format(newOrderName, newOrderNumber, newOrderType, newOrderStatus,
                                newOrderStatus, newProductID, newUserID, newQuantity, newUnitPrice, newBlockchainHash, newDescription)
                    mySqlDB.executeMysqldb(updateOrderSql)
                    print("update order SQL ==>> {}".format(updateOrderSql))
                    return jsonify({"code": 0, "msg": "The information of order was changed successfully！"})
                else:
                    return jsonify({"code": 7004, "msg": "Only Manufacturer could update order information"})
            else:
                return jsonify({"code": 7003, "msg": "Token is not right"})
        else:
            return jsonify({"code": 7002, "msg": "Please log in firstly"})
    else:
        return jsonify({"code": 7001, "msg": "The details of order could not be empty"})
    

@OrderBP.route("/order/deleteOrder/<string:id>", methods=['POST'])
def deleteOrder(id):
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
                if userRole == 8888888: # if usr role is order Manufacturer
                    queryOrderByIdSql = "SELECT * FROM orderProduct WHERE id = '{}'".format(id)
                    resQueryID = mySqlDB.selectMysqldb(queryOrderByIdSql)
                    print("Order {} query info   ==>> {}".format(id, resQueryID))

                    if not resQueryID: # no this order id
                        return jsonify({"code": 7005, "msg": "The order ID does not exist"})    
                    else:
                        delOrderSql = "DELETE FROM orderProduct WHERE id = '{}'".format(id)
                        mySqlDB.executeMysqldb(delOrderSql)
                        print("Delete order information SQL ==>> {}".format(delOrderSql))
                        return jsonify({"code": 0, "msg": "The order is deleted successfully！"})
                else:
                    return jsonify({"code": 7004, "msg": "Only administrator could delete order information"})
            else:
                return jsonify({"code": 7003, "msg": "Token is not right"})
        else:
            return jsonify({"code": 7002, "msg": "Please log in firstly"})
    else:
        return jsonify({"code": 7001, "msg": "Token could not be empty"})