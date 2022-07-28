from flask import Flask,render_template,send_file,url_for
from templates import connectdb

app = Flask(__name__)



@app.route('/')
def index():
    # return 'Hello World!'
    return render_template('index.html')

# @app.route('db')
# def database():
#     if mysql.

if __name__ == '__main__':
    app.run(host='localhost',port=5001,debug=True)