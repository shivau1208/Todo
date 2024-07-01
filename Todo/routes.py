from Todo import app
from flask import render_template,request,jsonify
from connectdb import db,listcollection

@app.route('/', methods=['GET','POST'])
def hello():
    return render_template('index.html')

@app.route('/task', methods=['POST'])
def task():
    try:
        frm  = request.get_json()
        task = frm.get("oname")
        discr = frm.get('odiscr')
        datetime = frm.get('odate')
        complete = frm.get('complete')
        if(task != ''):
            listcollection.insert_one({"task_name":f'{task}',"discr":f'{discr}',"due_time":f'{datetime}','task_complete':f'{complete}'})
        return jsonify({'status':200,'message':'Task created successfully'})
    except Exception as e:
        print(e)
        return jsonify({'status':403,'message':'Error in Task creating'})

@app.route('/list', methods=['GET'])
def list():
    try:
        data = listcollection.find({})
        docs = []
        if data:
            for doc in data:
                doc['_id'] = str(doc['_id'])
                docs.append(doc)
            return jsonify(docs)
    except Exception as e:
        print(e)
        return jsonify({'status':403,'message':'Error listing tasks'})

@app.route('/update',methods=['POST'])
def update():
    try:
        updt = request.get_json()
        nname = updt.get('nname')
        ndate = updt.get('ndate')
        ndiscr = updt.get('ndiscr')
        name = updt.get('name')
        listcollection.update_one({'task_name':f'{name}'},{'$set':{'task_name':f'{nname}','due_time':f'{ndate}','discr':f'{ndiscr}'}})
        return jsonify({'status':200,'message':'task updated successfully!'})
    except Exception as e:
        print(e)
        return jsonify({'status':403,'message':'Error updating task'})

@app.route('/complete', methods=['POST'])
def comp():
    try:
        complete_json = request.get_json()
        complete = complete_json.get('task_complete')
        task_name = complete_json.get('name')
        listcollection.update_one({'task_name':f'{task_name}'},{'$set':{'task_complete':f'{complete}'}})
        return jsonify({'status':200,'message':'Task completed successfully'})
    except Exception as e:
        print(e)
        return jsonify({'status':403,'message':'Error updating task'})

@app.route('/delete',methods=['POST'])
def delete():
    try:
        nm = request.get_json(force=True)
        listcollection.delete_one({'task_name':f'{nm}'})
        return jsonify({'status':200,'message':'task deleted successfully'}) 
    except Exception as e:
        print(e)
        return jsonify({'status':403,'message':'Error deleting task task'})
@app.route('/deleteall',methods=['POST'])
def deleteAll():
    try:
        listcollection.delete_many({'task_complete':"1"})
        return jsonify({'status':200,'message':'All task deleted successfully'}) 
    except Exception as e:
        print(e)
        return jsonify({'status':403,'message':'Error deleting task task'})
        
