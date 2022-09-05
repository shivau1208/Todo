from HR import app
from flask import render_template,request,jsonify,redirect
from connectdb import mydb
import json


@app.route('/', methods=['GET','POST'])
def hello():
    # cursor = mydb.connection.cursor()
    # cursor.execute('SET GLOBAL TIME_zone="+5:30"')
    # cursor.connection.commit()
    # cursor.close()
    return render_template('index.html')

@app.route('/task', methods=['POST'])
def task():
    cursor = mydb.connection.cursor()
    if request.method == 'POST':
        frm  = request.get_json()
        task = frm.get("oname")
        discr = frm.get('odiscr')
        datetime = frm.get('odate')
        if(task != ''):
            cursor.execute('INSERT INTO TaskList (task_name,discr,due_time) VALUES(%s,%s,%s)' , (task,discr,datetime,))
            cursor.connection.commit()
            cursor.close()
    return render_template('index.html')
@app.route('/complete', methods=['POST'])
def comp():
    cursor = mydb.connection.cursor()
    if request.method == 'POST':
        complete = request.get_json()
        complet = complete.get('task_complete')
        task_name = complete.get('name')
        cursor.execute('UPDATE TaskList SET task_complete=%s WHERE task_name=%s' , (complet,task_name))
        cursor.connection.commit()
    return render_template('index.html')
    
@app.route('/list', methods=['GET'])
def list():
    cursor = mydb.connection.cursor()
    if request.method == 'GET':
        cursor.execute('SELECT * FROM TaskList')
        data = cursor.fetchall()
        cursor.close()
        return jsonify(data)
    return render_template('index.html')

@app.route('/del',methods=['POST'])
def delete():
    cursor = mydb.connection.cursor()
    if request.method == 'POST':
        nm = request.get_json(force=True)
        cursor.execute('DELETE FROM TaskList WHERE task_name = %s',(nm,))
        cursor.connection.commit()
        cursor.close()
    return render_template('index.html') 
        
@app.route('/update',methods=['POST'])
def update():
    cursor = mydb.connection.cursor()
    if request.method == 'POST':
        updt = request.get_json()
        nname = updt.get('nname')
        ndate = updt.get('ndate')
        ndiscr = updt.get('ndiscr')
        name = updt.get('name')
        cursor.execute('UPDATE TaskList SET task_name=%s,due_time=%s,discr=%s WHERE task_name=%s',(nname,ndate,ndiscr,name,))
        cursor.connection.commit()
        cursor.close()
    return render_template('index.html')