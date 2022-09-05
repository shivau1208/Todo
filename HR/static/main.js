document.getElementById('close').addEventListener('click',cls);

// Load Task List
fetchdata()
function fetchdata() {
    fetch('/list')
        .then(res => res.json())
        .then(data => {
            // for (let i=0; i<data.length;i++){
            //     const dt = data.sort((a,b) => {
            //         if (b.time>a.time){
            //             return 1;
            //         }else{
            //             return -1;
            //         }
            //     });
            //     tasklist(dt[i].task_name,dt[i].task_complete)
            // }
            data.map(dt =>
                
                tasklist(dt.task_name,dt.task_complete,dt.due_time,dt.discr)
                )
        }
        )
        .catch(error => console.error(error))
}
function db(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET","/list")
    xhr.onload = function(){
        var dat = JSON.parse(this.response);
        for (let i=0; i<dat.length;i++){
            var dt = dat[i].task_name;
            var complete = dat[i].task_complete;
            tasklist(dt,complete)
        }
    }
    xhr.send();
}

// Adding New Task
document.getElementById('modal').addEventListener('click',insert);
function insert(){
    document.getElementById('form').addEventListener('submit',async function(e){
        e.preventDefault();
        var oname = e.target.inputId.value
        var odate = e.target.date.value
        var odiscr = e.target.message_text.value
        if(oname != '' && odate != ''){
            await fetch('/task',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({oname,odate,odiscr})
            })
        document.getElementById('close').click();
        window.location.reload();
        }else{
            alert('You must write something!');
        }
        // var xml = new XMLHttpRequest();
        // xml.open('POST','/task');
        // xml.setRequestHeader('Content-Type','application/json')
        // xml.send(JSON.stringify({oname,odate,odiscr}))            
    })
    db()
}

// Displaing New Task
function tasklist(data,complete,time,discr){
    var lin = document.createElement('div');
    lin.className = 'list-group-item mt-3 d-flex align-items-center li list-width';
    var tsk = document.createTextNode(data);
    var text = document.createElement('h4');
    text.className = 'text-dark mt-1 flex-grow-1 text';
    text.id = 'read'
    text.addEventListener('click',function(e){
        var name = data;
        linethrough(e,name)
        
    })
    text.appendChild(tsk);
    if (complete == true){
        text.style = 'text-decoration: line-through;text-decoration-style: solid;text-decoration-thickness: 2px;';
    }
    lin.appendChild(text);
    if(complete == true){
        document.getElementById('list').append(lin);
    }else{

        document.getElementById('list').prepend(lin);
    }
    edit(lin,data,time,discr);
    Delete(lin);
}
// Strike-Through to Mark as Read
function linethrough(ev,name) {
    if(ev.target.style.cssText == 'text-decoration: line-through 2px;'){
        ev.target.style = 'text-decoration:none;'
        task_complete = false
        document.getElementById('list').prepend(ev.target.parentElement)
    }else{
        ev.target.style = 'text-decoration: line-through;text-decoration-style: solid;text-decoration-thickness: 2px;'
        task_complete = true
        document.getElementById('list').append(ev.target.parentElement)
    }
    fetch('/complete',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            {task_complete,
            name,}
        )
    })
}

// Edit Task
function edit(lin,name,time,discr) {
    var edit = document.createElement('i');
    edit.className = 'fa fa-solid fa-pen-to-square p-1 m-1 edit';
    lin.appendChild(edit);
    edit.addEventListener('click',function(e){
        editable(name,time,discr)
    })
}
function editable(name,time,discr){
    document.getElementById('modal1').click();
    var input = document.getElementById('inputId');
    input.value = name;
    var x = new Date(time)
    var y = x.toISOString().slice(0,16)
    document.getElementById('date').value = y;
    document.getElementById('message_text').value = discr;
    update(name)

}
function cls(){
    document.getElementById('inputId').value = '';
    document.getElementById('date').value = '';
    document.getElementById('message_text').value = '';
}
function update(name){
    document.getElementById('form').addEventListener('submit',async function(e){
        e.preventDefault();
        var nname = e.target.inputId.value
        var ndate = e.target.date.value
        var ndiscr = e.target.message_text.value
        console.log(name,nname,ndate,ndiscr)
        await fetch('/update',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({nname,ndate,ndiscr,name})
        })
        document.getElementById('close').click();
        window.location.reload();
    })
}

// Delete Task
function Delete(lin) {
    var Delete = document.createElement('i');
    Delete.className = 'fa fa-solid fa-minus p-1 m-1';
    lin.appendChild(Delete);
    Delete.addEventListener('click',delSingle)
}
function delSingle(){
    var div = this.parentElement;
    div.remove();
    const d= JSON.stringify(div.firstChild.textContent);
    delS(d);
}
function delS(d){
    var xml = new XMLHttpRequest()
    xml.open('POST','/del',true);
    xml.setRequestHeader('Content-Type','application/json')
    xml.send(d)
}

// Mark as Read all Tasks
document.getElementById('right').addEventListener('click', markRead);
function markRead(){
    var li = document.querySelectorAll('.li');
    for (j=0; j<li.length;j++){
        li[j].firstChild.style = 'text-decoration: line-through;text-decoration-style: solid;text-decoration-thickness: 2px;';
        fetch('/complete',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                task_name:li[j].firstChild.textContent
            })
        })
    }
}

// Delete All Tasks
document.getElementById('del').addEventListener('click',delAll);
function delAll(){
    let propt = prompt('Are you sure?');
    if(propt=='yes'){
        let lis = document.querySelectorAll('.li');
        for (i=0; i<lis.length;i++){
            lis[i].remove();
            fetch('/del', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(lis[i].firstChild.textContent)
            })
        }
    }
}
