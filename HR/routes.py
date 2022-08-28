import json
from HR import app
from flask import render_template,request,jsonify
from connectdb import mydb


@app.route('/', methods=['GET','POST'])
def hello():
    return render_template('index.html')

@app.route('/task', methods=['POST'])
def task():
    cursor = mydb.connection.cursor()
    if request.method == 'POST':
        task = request.form.get("taskname")
        if(task != ''):
            cursor.execute('INSERT INTO tasks (task_name) VALUES(%s)' , (task,))
            cursor.connection.commit()
        # else:
        #     return render_template('index.html')
    return render_template('index.html')
@app.route('/complete', methods=['POST'])
def comp():
    cursor = mydb.connection.cursor()
    if request.method == 'POST':
        complete = request.get_json()
        for key,val in complete.items():
            cursor.execute('UPDATE tasks SET task_complete="Complete" WHERE task_name=%s' , (val,))
            cursor.connection.commit()
    return render_template('index.html')
    
@app.route('/list', methods=['GET'])
def list():
    cursor = mydb.connection.cursor()
    if request.method == 'GET':
        cursor.execute('SELECT * FROM tasks')
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data)
    return render_template('index.html')

@app.route('/del',methods=['POST'])
def delete():
    cursor = mydb.connection.cursor()
    if request.method == 'POST':
        nm = request.get_json(force=True)
        cursor.execute('DELETE FROM tasks WHERE task_name = %s',(nm,))
        cursor.connection.commit()
        cursor.close()
    return render_template('index.html') 
        