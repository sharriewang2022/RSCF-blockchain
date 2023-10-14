from flask import Flask, jsonify, request
from util.mySqlDB import mySqlDB


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route("/menu/allMenus", methods=["GET"])
def getAllMenus():
    """all menu info"""
    sql = "SELECT * FROM menu"
    data = mySqlDB.selectMysqldb(sql)
    print("all users' data == >> {}".format(data))
    return jsonify({"code": 0, "data": data, "msg": "success"})


@app.route("/menu/getSomeMenu/<string:userId>", methods=["GET"])
def getSomeMenu(userId):
    """some menu"""
    sql = "SELECT MenuID, MenuName FROM v_user_role_menu WHERE userId = '{}'".format(userId)
    data = mySqlDB.selectMysqldb(sql)
    print("gain {} menu info == >> {}".format(userId, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "success"})
    return jsonify({"code": "1004", "msg": "no user"})