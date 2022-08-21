from HR import app
from flask import render_template,request,jsonify
from connectdb import mydb


@app.route('/', methods=['GET','POST'])
def hello():
    return render_template('index.html')

@app.route('/task', methods=['GET','POST'])
def task():
    cursor = mydb.connection.cursor()

    if request.method == 'POST':
        task = request.form.get("taskname")
        cursor.execute('INSERT INTO Tasks (task_name) VALUES(%s)' , (task,))
        cursor.connection.commit()
    elif request.method == 'GET':
        cursor.execute('SELECT * FROM Tasks')
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data)
    return render_template('index.html')

# @app.route('/rmtask',methods=['GET','POST'])
# def delete():
#     cursor = mydb.connection.cursor()
#     if request.method == 'POST':
