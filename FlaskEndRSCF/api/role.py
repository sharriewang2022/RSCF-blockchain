from flask import Flask, jsonify, request
from util.mySqlDB import mySqlDB


app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False


@app.route("/allRoles", methods=["GET"])
def getAllRoles():
    """all role info"""
    sql = "SELECT * FROM role"
    data = mySqlDB.selectMysqldb(sql)
    print("all users' data == >> {}".format(data))
    return jsonify({"code": 0, "data": data, "msg": "success"})


@app.route("/someRole/<string:userId>", methods=["GET"])
def getSomeRole(userId):
    """some role"""
    sql = "SELECT RoleID, RoleName FROM v_user_role_menu WHERE userId = '{}'".format(userId)
    data = mySqlDB.selectMysqldb(sql)
    print("gain {} role info == >> {}".format(userId, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "success"})
    return jsonify({"code": "1004", "msg": "no user"})