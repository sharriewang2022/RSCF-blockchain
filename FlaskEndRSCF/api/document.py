# https://gist.githubusercontent.com/radtech/a6165b28d4486bf7f15795fafaeb155f/raw/4187883018f0e7a9f7d8d89c2f6787f4a9a12837/FileUpload.py

from flask import Flask, jsonify, request, flash, redirect, url_for, session
from util.mySqlDB import mySqlDB
from util.redisUtil import redisUtil
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
from datetime import datetime
import uuid

app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('Supply chain document')

if __name__ == "__main__":
    app.secret_key = os.urandom(24)
    app.run(debug=True,host="0.0.0.0",use_reloader=False)

flask_cors.CORS(app, expose_headers='Authorization')


@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    logger.info("welcome to upload`")
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    response="Whatever you wish too return"
    return response




@app.route("/allDocuments", methods=["GET"])
def getAllDocuments():
    """all document info"""
    sql = "SELECT * FROM document"
    data = mySqlDB.selectMysqldb(sql)
    print("all documents' data == >> {}".format(data))
    return jsonify({"code": 0, "data": data, "msg": "success"})


@app.route("/someDocument/<string:documentId>", methods=["GET"])
def getSomeDocument(documentId):
    """some document"""
    sql = "SELECT * FROM document WHERE documentId = '{}'".format(documentId)
    data = mySqlDB.selectMysqldb(sql)
    print("gain {} document info == >> {}".format(documentId, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "success"})
    return jsonify({"code": "1004", "msg": "no document"})

@app.route("/userDocument/<string:userId>", methods=["GET"])
def getSomeDocument(userId):
    """some document"""
    sql = "SELECT * FROM document WHERE authorId = '{}'".format(userId)
    data = mySqlDB.selectMysqldb(sql)
    print("Gain {} document info == >> {}".format(userId, data))
    if data:
        return jsonify({"code": 0, "data": data, "msg": "success"})
    return jsonify({"code": "1004", "msg": "no document"})


@app.route("/add/document", methods=['POST'])
def addDocument():
    """add document"""
    documentId = uuid.uuid1()
    documentName = request.json.get("documentName", "").strip() 
    extensionName = request.json.get("extensionName", "").strip()
    realPath = request.json.get("realPath", "").strip()
    authorID = request.json.get("authorID", "").strip()
    description = request.json.get("description", "").strip()
    blockchainHash = request.json.get("blockchainHash", "").strip()
    createDate = datetime.now().date

    if documentName : # if "", the false
        queryDocumentNameSql = "SELECT documentName FROM document WHERE documentname = '{}'".format(documentName)
        isDocumentExist = mySqlDB.selectMysqldb(queryDocumentNameSql)
        print("Querey document result ==>> {}".format(isDocumentExist))
  
        if isDocumentExist:
            return jsonify({"code": 8001, "msg": "The document name already exists！"})
        else:             
            addDocumentSql = "INSERT INTO document (documentId, documentName, extensionName, realPath, "\
                "authorID, blockchainHash, description, createDate) "\
                "VALUES('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}')".format(documentId, documentName, extensionName,
                    realPath, authorID, blockchainHash, description, createDate)
            mySqlDB.executeMysqldb(addDocumentSql)
            print("Add document SQL ==>> {}".format(addDocumentSql))
            return jsonify({"code": 0, "msg": "The document is added successfully！"})
    else:
        return jsonify({"code": 8008, "msg": "The name of document could not be null"})



@app.route("/update/document/<int:id>", methods=['PUT'])
def UpdateDocument(id):  
    """update document"""
    documentManufacturer = request.json.get("documentManufacturer", "").strip()  
    token = request.json.get("token", "").strip()  
    documentAuthorID = request.json.get("userID", "").strip()  
    newDocumentName = request.json.get("documentName", "").strip() 
    newExtensionName = request.json.get("extensionName", "").strip()
    newRealPath = request.json.get("realPath", "").strip()
    newAuthorID = request.json.get("authorID", "").strip()
    newBlockchainHash = request.json.get("blockchainHash", "").strip()
    newDescription = request.json.get("description", "").strip()


    if documentManufacturer and token and newDocumentName and newExtensionName \
        and newRealPath and newAuthorID :
        # get token from redis
        redisToken = redisUtil.operateRedisToken(documentManufacturer) 
        if redisToken:
            if redisToken == token: # redis token ==  request body token
                queryDocumentByIdSql = "SELECT * FROM document WHERE id = '{}'".format(id)
                resQueryID = mySqlDB.selectMysqldb(queryDocumentByIdSql)
                print("Document {} query info   ==>> {}".format(id, resQueryID))

                if not resQueryID: # no this document id
                    return jsonify({"code": 8005, "msg": "The document ID does not exist"})                   
        
                updateDocumentSql = "UPDATE document SET documentName = '{}', extensionName = '{}', realPath = '{}', "\
                        "authorID = '{}', blockchainHash = '{}', description = '{}' "\
                        "WHERE id = {}".format(newDocumentName, newExtensionName, newRealPath, 
                            newAuthorID, newBlockchainHash, newDescription)
                mySqlDB.executeMysqldb(updateDocumentSql)
                print("update document SQL ==>> {}".format(updateDocumentSql))
                return jsonify({"code": 0, "msg": "The information of document was changed successfully！"})
               
            else:
                return jsonify({"code": 8003, "msg": "Token is not right"})
        else:
            return jsonify({"code": 8002, "msg": "Please log in firstly"})
    else:
        return jsonify({"code": 8001, "msg": "The details of document could not be empty"})
    

@app.route("/delete/document/<string:id>", methods=['POST'])
def deleteDocument(id):
    adminUser = request.json.get("adminUser", "").strip()  
    token = request.json.get("token", "").strip()  
    if adminUser and token:
        redisToken = redisUtil.operateRedisToken(adminUser) 
        if redisToken:
            if redisToken == token:  #  redis_token  == body token

                queryDocumentByIdSql = "SELECT * FROM document WHERE id = '{}'".format(id)
                resQueryID = mySqlDB.selectMysqldb(queryDocumentByIdSql)
                print("Document {} query info   ==>> {}".format(id, resQueryID))

                if not resQueryID: # no this document id
                    return jsonify({"code": 8005, "msg": "The document ID does not exist"})    
                else:
                    delDocumentSql = "DELETE FROM document WHERE id = '{}'".format(id)
                    mySqlDB.executeMysqldb(delDocumentSql)
                    print("Delete document information SQL ==>> {}".format(delDocumentSql))
                    return jsonify({"code": 0, "msg": "The document is deleted successfully！"})
                
            else:
                return jsonify({"code": 8003, "msg": "Token is not right"})
        else:
            return jsonify({"code": 8002, "msg": "Please log in firstly"})
    else:
        return jsonify({"code": 8001, "msg": "Token could not be empty"})