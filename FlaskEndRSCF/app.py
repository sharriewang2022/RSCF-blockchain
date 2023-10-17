from flask import Flask
app = Flask(__name__)

import os, sys
from config.setting import SERVER_PORT
from api.user import app
from api.product import app
from api.order import app
from api.category import app
from api.document import app
from api.menu import app
from api.role import app


BASE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_PATH) 

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=SERVER_PORT, debug=True)

@app.route("/", methods =['GET'])
def home():
    return "Hello, Flask!%$##"


@app.route("/test", methods =['GET'])
def test():
    print("testss")
    return "test, Flask!" 