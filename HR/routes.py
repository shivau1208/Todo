from HR import app
from flask import render_template,request,jsonify
from connectdb import mydb


@app.route('/', methods=['GET','POST'])
def hello():
    return render_template('index.html')

@app.route('/task', methods=['GET','POST'])
def task():

    if request.method == 'POST':
        task = request.form.get("taskname")
        cursor = mydb.connection.cursor()
        cursor.execute('INSERT INTO Tasks (task_name) VALUES(%s)' , (task,))
        cursor.connection.commit()
        cursor.execute('SELECT * FROM Tasks')
        data = cursor.fetchall()
        cursor.close()
        dt = jsonify(data)
        # print(data)
        return dt
    return render_template('index.html')