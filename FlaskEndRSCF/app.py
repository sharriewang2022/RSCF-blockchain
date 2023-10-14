from flask import Flask
app = Flask(__name__)

import os, sys
from config.setting import SERVER_PORT
from api.user import app


BASE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_PATH) 

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=SERVER_PORT, debug=True)

@app.route("/", methods =['GET'])
def home():
    return "Hello, Flask!" +"test"