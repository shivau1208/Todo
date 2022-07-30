from flask import Flask,render_template, request
from flask_mysqldb import MySQL


app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'ToDo'
app.config['MYSQL_PORT'] = 3306

mydb = MySQL(app)

@app.route('/',methods = ['POST', 'GET'])
@app.route('/task',methods = ['POST', 'GET'])
def task():
    # msg=''

    # if request.method == "POST":
    #     name = request.form['taskname']
    #     conn = mydb.connection.cursor()
    #     conn.execute('''INSERT INTO Tasks(id,task_name) VALUES(02,%s)''',(name,))
    #     conn.connection.commit()
    #     print(conn.rowcount,'row inserted')
    #     conn.close()
    return render_template('index.html')




# @app.route('/task',methods = ['POST', 'GET'])
# def index():
    
#         return f"Done!"



if __name__ == '__main__':
    app.run(host='localhost',port=5001,debug=True)